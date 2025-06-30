
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CrewMember } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateCrewMember } from '../../actions';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  role: z.string().min(2, 'Role must be at least 2 characters.'),
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
  imageUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  order: z.coerce.number().min(1, 'Order must be at least 1.'),
});

type FormData = z.infer<typeof formSchema>;

interface EditCrewFormProps {
    member: CrewMember;
}

export default function EditCrewForm({ member }: EditCrewFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      imageUrl: member.imageUrl,
      order: member.order,
    },
  });

  const imageUrl = form.watch('imageUrl');
  const memberName = form.watch('name');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // The server action redirects on success. The try/catch is removed
    // to prevent the redirect error from being caught and displayed as a form error.
    await updateCrewMember(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Crew Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={imageUrl} alt={memberName} />
                    <AvatarFallback>{memberName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormLabel>Image URL</FormLabel>
                        <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="Crew member's name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl><Input placeholder="e.g., Founder & CEO" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl><Input type="number" min="1" placeholder="1" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl><Textarea placeholder="A short biography of the crew member" {...field} className="h-24" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
