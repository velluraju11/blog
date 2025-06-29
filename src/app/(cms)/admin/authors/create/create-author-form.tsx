"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
  avatarUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateAuthorForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      avatarUrl: '',
    },
  });

  const avatarUrl = form.watch('avatarUrl');
  const authorName = form.watch('name');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // In a real app, you would send this to a server action or API to create the author.
    toast({
      title: 'Author Created!',
      description: `The new author "${data.name}" has been created.`,
    });
    setIsLoading(false);
    router.push('/admin/authors');
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>New Author Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={avatarUrl} alt={authorName} />
                    <AvatarFallback>{authorName?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl><Input placeholder="https://example.com/avatar.png" {...field} /></FormControl>
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
                  <FormControl><Input placeholder="Author's name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl><Textarea placeholder="A short biography of the author" {...field} className="h-24" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
          Create Author
        </Button>
      </form>
    </Form>
  );
}
