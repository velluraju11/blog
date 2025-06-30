
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2, Image as ImageIcon, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import type { Category, Author } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { createPost } from '../posts/actions';

const formSchema = z.object({
  topic: z.string().min(5, 'Topic must be at least 5 characters.'),
  keywords: z.string().min(3, 'Please provide at least one keyword.'),
  description: z.string().optional(),
  categoryId: z.string({ required_error: "Please select a category." }).min(1, 'Please select a category.'),
  authorId: z.string({ required_error: "Please select an author." }).min(1, 'Please select an author.'),
  tone: z.string().optional(),
  length: z.string().optional(),
  publishAction: z.enum(['now', 'schedule']).default('now'),
  scheduledAt: z.date().optional(),
}).refine(data => {
  if (data.publishAction === 'schedule') {
    return !!data.scheduledAt && data.scheduledAt > new Date();
  }
  return true;
}, {
  message: "Scheduled date must be in the future.",
  path: ["scheduledAt"],
});

type FormData = z.infer<typeof formSchema>;

export default function GenerateForm({ categories, authors }: { categories: Category[], authors: Author[] }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedData, setGeneratedData] = useState<GenerateBlogPostOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      keywords: '',
      description: '',
      categoryId: '',
      authorId: '',
      tone: 'Informative',
      length: 'Medium',
      publishAction: 'now',
    },
  });

  const publishAction = form.watch('publishAction');

  const handleGenerate = async () => {
    const isValid = await form.trigger(['topic', 'keywords', 'authorId', 'categoryId']);
    if (!isValid) return;

    setIsGenerating(true);
    setGeneratedData(null);
    try {
      const formData = form.getValues();
      const response = await generateBlogPost(formData);
      setGeneratedData(response);
      toast({
        title: 'Content Generated!',
        description: 'Review the content and image, then save the post.',
      });
    } catch (error) {
      console.error('Error generating blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An error occurred. Ensure your API key is configured.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    if (!generatedData) {
        toast({
            variant: 'destructive',
            title: 'Cannot Save Post',
            description: 'Please generate the content first.',
        });
        return;
    }
    setIsSubmitting(true);
    try {
        const formData = form.getValues();
        const postToSave = {
            title: generatedData.title,
            content: generatedData.content,
            imageUrl: generatedData.imageUrl,
            imageHint: formData.topic,
            // A real app might have a better excerpt generator
            excerpt: generatedData.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
            tags: formData.keywords,
            isFeatured: false,
            ...formData
        };

        await createPost(postToSave);

        const isScheduling = formData.publishAction === 'schedule';
        toast({
            title: isScheduling ? 'Post Scheduled!' : 'Post Published!',
            description: isScheduling 
            ? `The post "${generatedData.title}" is scheduled for ${format(formData.scheduledAt!, 'PPP')}.`
            : `The post "${generatedData.title}" has been created.`,
        });

    } catch (error) {
        console.error('Error saving post:', error);
        toast({
            variant: 'destructive',
            title: 'Failed to Save Post',
            description: 'An unexpected error occurred.',
        });
        setIsSubmitting(false);
    }
  }

  const isLoading = isGenerating || isSubmitting;
  
  return (
    <Form {...form}>
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Content Parameters</CardTitle>
          <CardDescription>1. Provide details, 2. Generate content, 3. Save post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Future of Quantum Computing in Cybersecurity" {...field} disabled={isLoading} />
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
                  <FormLabel>Keywords (used as tags)</FormLabel>
                  <FormControl>
                    <Input placeholder="quantum, security, encryption" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Start with a bold statement. Include a section on post-quantum cryptography. Use an image: [image - a futuristic padlock made of light]"
                      className="h-24"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    To generate an image inside the post, use the format: [image - your image prompt]
                  </FormDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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

            <Button type="button" onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Content
            </Button>

            <hr className="my-6" />

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
                      disabled={isLoading}
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
              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Schedule Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={isLoading || !generatedData} className="w-full">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (publishAction === 'schedule' ? <Clock className="mr-2 h-4 w-4" /> : <Wand2 className="mr-2 h-4 w-4" />)}
              {publishAction === 'schedule' ? 'Schedule Post' : 'Publish Post'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Generated Image</CardTitle>
                <CardDescription>A hero image for your blog post.</CardDescription>
            </CardHeader>
            <CardContent>
                {isGenerating ? (
                    <Skeleton className="w-full aspect-video rounded-md" />
                ) : generatedData?.imageUrl ? (
                    <Image
                        src={generatedData.imageUrl}
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
            {isGenerating && !generatedData && (
              <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-64 w-full" />
              </div>
            )}
            {generatedData && (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input readOnly value={generatedData.title} />
                </div>
                <div>
                  <Label>Content (HTML)</Label>
                  <div
                    className="prose dark:prose-invert max-w-none p-4 border rounded-md h-80 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: generatedData.content }}
                  />
                </div>
              </div>
            )}
            {!isGenerating && !generatedData && (
              <div className="text-center text-muted-foreground py-12">
                  Your generated content will be displayed here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </Form>
  );
}
