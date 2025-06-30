'use server';

import { z } from 'zod';
import { readDb, writeDb } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const baseFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  categoryId: z.string().min(1, 'Please select a category.'),
  authorId: z.string().min(1, 'Please select an author.'),
  tags: z.string().optional(),
  isFeatured: z.boolean().default(false),
  publishAction: z.enum(['draft', 'now', 'schedule']).default('now'),
  scheduledAt: z.date().optional(),
});

// For AI generation
const aiFormSchema = baseFormSchema.extend({
  imageUrl: z.string().url(),
  imageHint: z.string(),
});

// For manual creation
const manualFormSchema = baseFormSchema.extend({
    // Manual form doesn't provide image directly, can be added later
});


export async function createPost(formData: z.infer<typeof aiFormSchema> | z.infer<typeof manualFormSchema>) {
    // We can't easily merge the zod schemas, so we'll validate common fields and handle specifics
    const validatedFields = baseFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to create post.',
        };
    }
    
    const { title, excerpt, content, categoryId, authorId, tags, isFeatured, publishAction, scheduledAt } = validatedFields.data;
    
    const slug = slugify(title);

    try {
        const db = await readDb();

        const existingPost = db.posts.find(p => p.slug === slug);
        if (existingPost) {
            return { message: 'A post with this title already exists.' };
        }

        const newPost: any = {
            id: uuidv4(),
            slug,
            title,
            excerpt,
            content,
            authorId,
            categoryId,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isFeatured,
            ratings: { '😠': 0, '😕': 0, '🤔': 0, '😊': 0, '😍': 0 },
            views: 0
        };

        if ('imageUrl' in formData) {
            newPost.imageUrl = formData.imageUrl;
            newPost.imageHint = formData.imageHint;
        } else {
            newPost.imageUrl = 'https://placehold.co/600x400.png';
            newPost.imageHint = 'placeholder';
        }

        if (publishAction === 'schedule' && scheduledAt) {
            newPost.status = 'scheduled';
            newPost.publishedAt = scheduledAt.toISOString();
        } else if (publishAction === 'draft') {
            newPost.status = 'draft';
            newPost.publishedAt = new Date().toISOString();
        } else {
            newPost.status = 'published';
            newPost.publishedAt = new Date().toISOString();
        }

        db.posts.push(newPost);
        await writeDb(db);
    } catch (e) {
        console.error(e)
        return { message: 'Database Error: Failed to create post.' };
    }

    if (publishAction === 'schedule') {
        revalidatePath('/admin/scheduler');
        redirect('/admin/scheduler');
    } else {
        revalidatePath('/admin/posts');
        redirect('/admin/posts');
    }
}

const updateFormSchema = baseFormSchema.extend({
    id: z.string(),
    slug: z.string(),
});

export async function updatePost(formData: z.infer<typeof updateFormSchema>) {
    const validatedFields = updateFormSchema.safeParse(formData);
    
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to update post.',
        };
    }

    const { id, slug, title, excerpt, content, categoryId, authorId, tags, isFeatured, publishAction, scheduledAt } = validatedFields.data;

    try {
        const db = await readDb();
        const postIndex = db.posts.findIndex(p => p.id === id);

        if (postIndex === -1) {
            return { message: 'Post not found.' };
        }

        const post = db.posts[postIndex];

        post.title = title;
        post.excerpt = excerpt;
        post.content = content;
        post.categoryId = categoryId;
        post.authorId = authorId;
        post.tags = tags ? tags.split(',').map(tag => tag.trim()) : [];
        post.isFeatured = isFeatured;

        if (publishAction === 'schedule' && scheduledAt) {
            post.status = 'scheduled';
            post.publishedAt = scheduledAt.toISOString();
        } else if (publishAction === 'draft') {
            post.status = 'draft';
        } else { // 'now'
            post.status = 'published';
            // Only update publishedAt if it was not already published
            if (post.status !== 'published') {
                post.publishedAt = new Date().toISOString();
            }
        }
        
        db.posts[postIndex] = post;
        await writeDb(db);

    } catch (e) {
        return { message: 'Database Error: Failed to update post.' };
    }
    
    if (publishAction === 'schedule') {
        revalidatePath('/admin/scheduler');
        redirect('/admin/scheduler');
    } else {
        revalidatePath('/admin/posts');
        revalidatePath(`/admin/posts/edit/${slug}`);
        revalidatePath(`/blog/${slug}`);
        redirect('/admin/posts');
    }
}
