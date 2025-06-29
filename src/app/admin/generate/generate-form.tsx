"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateBlogPost, GenerateBlogPostOutput } from '@/ai/flows/generate-blog-post';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import type { Category, Author } from '@/lib/types';

const formSchema = z.object({
  topic: z.string().min(5, 'Topic must be at least 5 characters.'),
  keywords: z.string().min(3, 'Please provide at least one keyword.'),
  categoryId: z.string({ required_error: "Please select a category." }).min(1, 'Please select a category.'),
  authorId: z.string({ required_error: "Please select an author." }).min(1, 'Please select an author.'),
  tone: z.string().optional(),
  length: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GenerateForm({ categories, authors }: { categories: Category[], authors: Author[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateBlogPostOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      keywords: '',
      categoryId: '',
      authorId: '',
      tone: 'Informative',
      length: 'Medium',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      // The authorId is not yet used in the AI flow, but this structure supports it for future DB integration.
      const response = await generateBlogPost(data);
      setResult(response);
      toast({
        title: 'Success!',
        description: 'Blog post and image generated successfully.',
      });
    } catch (error) {
      console.error('Error generating blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An error occurred while generating the blog post. Ensure your API key is configured.',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Content Parameters</CardTitle>
          <CardDescription>Provide details for the AI to generate a post and a hero image.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Future of Quantum Computing in Cybersecurity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="quantum, security, encryption" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
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
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select an author" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author.id} value={author.id}>
                                {author.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a tone" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Informative">Informative</SelectItem>
                          <SelectItem value="Humorous">Humorous</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Formal">Formal</SelectItem>
                          <SelectItem value="Rebellious">Rebellious</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a length" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Short">Short</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Generated Image</CardTitle>
                <CardDescription>A hero image for your blog post.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="w-full aspect-video rounded-md" />
                ) : result?.imageUrl ? (
                    <Image
                        src={result.imageUrl}
                        alt="Generated blog post image"
                        width={1280}
                        height={720}
                        className="rounded-md border aspect-video object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center aspect-video border border-dashed rounded-md text-muted-foreground">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <p>Your generated image will appear here.</p>
                    </div>
                )}
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Content</CardTitle>
            <CardDescription>The AI-generated blog post will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && !result && (
              <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-64 w-full" />
              </div>
            )}
            {result && (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input readOnly value={result.title} />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea readOnly value={result.content} className="h-80" />
                </div>
              </div>
            )}
            {!isLoading && !result && (
              <div className="text-center text-muted-foreground py-12">
                  Your generated content will be displayed here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
