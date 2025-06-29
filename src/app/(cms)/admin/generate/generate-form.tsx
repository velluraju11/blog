
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
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateBlogPostOutput | null>(null);
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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateBlogPost(data);
      
      const isScheduling = data.publishAction === 'schedule';
      toast({
        title: isScheduling ? 'Post Scheduled!' : 'Post Published!',
        description: isScheduling 
          ? `The post "${response.title}" is scheduled for ${format(data.scheduledAt!, 'PPP')}.`
          : `The post "${response.title}" has been created.`,
      });

      // In a real app with a database, the post would be saved here.
      // For this prototype, we redirect to give the user a sense of completion.
      if (isScheduling) {
        router.push('/admin/scheduler');
      } else {
        router.push('/admin/posts');
      }
      router.refresh();

    } catch (error) {
      console.error('Error generating blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An error occurred while generating the blog post. Ensure your API key is configured.',
      });
      setIsLoading(false); // Only stop loading on error, success case will redirect and unmount.
    }
  };
  
  const getButtonText = () => {
    if (isLoading) return "Generating...";
    if (publishAction === 'schedule') return "Generate & Schedule Post";
    return 'Generate & Publish Post';
  }
  
  const getButtonIcon = () => {
      if (isLoading) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
      return publishAction === 'schedule' ? <Clock className="mr-2 h-4 w-4" /> : <Wand2 className="mr-2 h-4 w-4" />;
  }

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

              <Button type="submit" disabled={isLoading} className="w-full">
                {getButtonIcon()}
                {getButtonText()}
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
                  <Label>Content (HTML)</Label>
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
