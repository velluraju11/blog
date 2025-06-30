'use server';

import { z } from 'zod';
import { readDb, writeDb } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
  avatarUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

export async function createAuthor(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to create author.',
        };
    }
    
    const { name, bio, avatarUrl } = validatedFields.data;

    try {
        const db = await readDb();
        const newId = uuidv4();
        const newAuthor = { 
            id: newId, 
            name, 
            bio, 
            avatarUrl: avatarUrl || 'https://placehold.co/100x100.png' 
        };
        db.authors[newId] = newAuthor;
        await writeDb(db);
    } catch (e) {
        return { message: 'Database Error: Failed to create author.' };
    }

    revalidatePath('/admin/authors');
    redirect('/admin/authors');
}

export async function updateAuthor(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to update author.',
        };
    }
    
    const { id, name, bio, avatarUrl } = validatedFields.data;

    if (!id) {
        return { message: 'ID missing. Failed to update author.' };
    }

    try {
        const db = await readDb();
        if (!db.authors[id]) {
            return { message: 'Author not found.' };
        }
        db.authors[id] = { ...db.authors[id], name, bio, avatarUrl: avatarUrl || 'https://placehold.co/100x100.png' };
        await writeDb(db);
    } catch (e) {
        return { message: 'Database Error: Failed to update author.' };
    }

    revalidatePath('/admin/authors');
    revalidatePath(`/admin/authors/edit/${id}`);
    redirect('/admin/authors');
}
