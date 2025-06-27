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
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  topic: z.string().min(5, 'Topic must be at least 5 characters.'),
  keywords: z.string().min(3, 'Please provide at least one keyword.'),
  tone: z.string().optional(),
  length: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GenerateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateBlogPostOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      keywords: '',
      tone: 'Informative',
      length: 'Medium',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateBlogPost(data);
      setResult(response);
      toast({
        title: 'Success!',
        description: 'Blog post generated successfully.',
      });
    } catch (error) {
      console.error('Error generating blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An error occurred while generating the blog post.',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Content Parameters</CardTitle>
          <CardDescription>Provide details for the AI to generate a post.</CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generated Content</CardTitle>
          <CardDescription>The AI-generated blog post will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
  );
}
