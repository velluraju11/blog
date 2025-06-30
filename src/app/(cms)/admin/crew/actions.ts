'use server';

import { z } from 'zod';
import { readDb, writeDb } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    role: z.string().min(2, 'Role must be at least 2 characters.'),
    bio: z.string().min(10, 'Bio must be at least 10 characters.'),
    imageUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
    order: z.coerce.number().min(1, 'Order must be at least 1.'),
});

export async function createCrewMember(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to create crew member.',
        };
    }
    
    const { name, role, bio, imageUrl, order } = validatedFields.data;

    try {
        const db = await readDb();
        const newId = uuidv4();
        const newMember = { 
            id: newId, 
            name, 
            role,
            bio, 
            imageUrl: imageUrl || 'https://placehold.co/400x400.png',
            order
        };
        db.crewMembers[newId] = newMember;
        await writeDb(db);
    } catch (e) {
        return { message: 'Database Error: Failed to create crew member.' };
    }

    revalidatePath('/admin/crew');
    redirect('/admin/crew');
}

export async function updateCrewMember(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error. Failed to update crew member.',
        };
    }
    
    const { id, name, role, bio, imageUrl, order } = validatedFields.data;

    if (!id) {
        return { message: 'ID missing. Failed to update crew member.' };
    }

    try {
        const db = await readDb();
        if (!db.crewMembers[id]) {
            return { message: 'Crew member not found.' };
        }
        db.crewMembers[id] = { ...db.crewMembers[id], name, role, bio, imageUrl: imageUrl || 'https://placehold.co/400x400.png', order };
        await writeDb(db);
    } catch (e) {
        return { message: 'Database Error: Failed to update crew member.' };
    }

    revalidatePath('/admin/crew');
    revalidatePath(`/admin/crew/edit/${id}`);
    redirect('/admin/crew');
}
