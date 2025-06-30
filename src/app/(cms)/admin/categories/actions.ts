'use server';

import { z } from 'zod';
import { readDb, writeDb } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
});

export async function createCategory(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to create category.',
        };
    }
    
    const { name } = validatedFields.data;

    try {
        const db = await readDb();
        const newId = uuidv4();
        const newCategory = { id: newId, name };
        db.categories[newId] = newCategory;
        await writeDb(db);
    } catch (e) {
        return { message: 'Database Error: Failed to create category.' };
    }

    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}

export async function updateCategory(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to update category.',
        };
    }
    
    const { id, name } = validatedFields.data;

    if (!id) {
        return { message: 'ID missing. Failed to update category.' };
    }

    try {
        const db = await readDb();
        if (!db.categories[id]) {
            return { message: 'Category not found.' };
        }
        db.categories[id] = { ...db.categories[id], name };
        await writeDb(db);
    } catch (e) {
        return { message: 'Database Error: Failed to update category.' };
    }

    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/edit/${id}`);
    redirect('/admin/categories');
}
