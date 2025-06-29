"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Post, Category, Author } from '@/lib/types';
import dynamic from 'next/dynamic';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RichTextEditor = dynamic(() => import('@/components/rich-text-editor'), { ssr: false });

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  categoryId: z.string().min(1, 'Please select a category.'),
  authorId: z.string().min(1, 'Please select an author.'),
  tags: z.string().optional(),
  isFeatured: z.boolean().default(false),
  publishAction: z.enum(['now', 'schedule']).default('now'),
  scheduledDate: z.date().optional(),
  scheduledTime: z.string().optional(),
}).refine(data => {
    if (data.publishAction === 'schedule') {
        if (!data.scheduledDate || !data.scheduledTime) {
            return false;
        }
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(data.scheduledTime)) {
            return false;
        }
        const [hours, minutes] = data.scheduledTime.split(':').map(Number);
        const scheduledDateTime = new Date(data.scheduledDate);
        scheduledDateTime.setHours(hours, minutes, 0, 0);
        return scheduledDateTime > new Date();
    }
    return true;
}, {
  message: "Scheduled date and time must be a valid time in the future.",
  path: ["scheduledTime"],
});

type FormData = z.infer<typeof formSchema>;

interface EditPostFormProps {
    post: Post;
    categories: Category[];
    authors: Author[];
}

export default function EditPostForm({ post, categories, authors }: EditPostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      categoryId: post.category.id,
      authorId: post.author.id,
      tags: post.tags.join(', '),
      isFeatured: post.isFeatured || false,
      publishAction: post.status === 'scheduled' ? 'schedule' : 'now',
      scheduledDate: post.status === 'scheduled' && post.publishedAt ? new Date(post.publishedAt) : undefined,
      scheduledTime: post.status === 'scheduled' && post.publishedAt ? format(new Date(post.publishedAt), 'HH:mm') : undefined,
    },
  });

  const publishAction = form.watch('publishAction');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // In a real app, you would transform `data` before sending to your backend.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Post Updated!',
      description: 'The changes have been saved successfully (simulated).',
    });
    setIsLoading(false);
    router.push('/ryhacontentmanagement/posts');
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>Edit the main content of your blog post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="Your post title" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl><Textarea placeholder="A short summary of the post" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Content</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader><CardTitle>Metadata</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                 <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {categories.map((category) => (<SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select an author" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {authors.map((author) => (<SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl><Input placeholder="tag1, tag2, tag3" {...field} /></FormControl>
                        <FormDescription>Comma-separated tags.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Feature Post</FormLabel>
                                <FormDescription>Show this post on the homepage.</FormDescription>
                            </div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )}
                    />
              </CardContent>
            </Card>
            {post.status !== 'published' && (
              <Card>
                  <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                      <FormField
                      control={form.control}
                      name="publishAction"
                      render={({ field }) => (
                          <FormItem className="space-y-3">
                          <FormLabel>Publish Options</FormLabel>
                          <FormControl>
                              <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                              >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl><RadioGroupItem value="now" /></FormControl>
                                  <FormLabel className="font-normal">Publish Immediately</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl><RadioGroupItem value="schedule" /></FormControl>
                                  <FormLabel className="font-normal">Schedule for Later</FormLabel>
                              </FormItem>
                              </RadioGroup>
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />

                      {publishAction === 'schedule' && (
                      <div className="space-y-4">
                          <FormField
                          control={form.control}
                          name="scheduledDate"
                          render={({ field }) => (
                              <FormItem className="flex flex-col">
                              <FormLabel>Schedule Date</FormLabel>
                              <Popover>
                                  <PopoverTrigger asChild>
                                  <FormControl>
                                      <Button
                                      variant={"outline"}
                                      className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                                      >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                  </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                  <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                                  />
                                  </PopoverContent>
                              </Popover>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="scheduledTime"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Schedule Time</FormLabel>
                              <FormControl>
                                  <div className="relative">
                                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input type="time" {...field} className="pl-10" />
                                  </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                      </div>
                      )}
                  </CardContent>
              </Card>
            )}
          </div>
        </div>
        <Button type="submit" disabled={isLoading} size="lg">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
