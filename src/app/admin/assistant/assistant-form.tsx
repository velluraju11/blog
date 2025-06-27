"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiBlogAssistant, AiBlogAssistantOutput } from '@/ai/flows/ai-blog-assistant';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  content: z.string().min(50, 'Content must be at least 50 characters long.'),
  focusKeyword: z.string().min(3, 'Please provide a focus keyword.'),
  tone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AssistantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiBlogAssistantOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      focusKeyword: '',
      tone: 'professional',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await aiBlogAssistant(data);
      setResult(response);
      toast({
        title: 'Analysis Complete!',
        description: 'Content has been improved successfully.',
      });
    } catch (error) {
      console.error('Error with AI assistant:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'An error occurred while improving the content.',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Original Content</CardTitle>
                    <CardDescription>Paste your blog post content here and provide a focus keyword.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Post Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Paste your article here..." {...field} className="h-64" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="focusKeyword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Focus Keyword</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., AI in Cybersecurity" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         {/* Placeholder for tone selector if needed in future */}
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Improve My Post
            </Button>
          </form>
        </Form>
      
      {(isLoading || result) && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Improved Content</CardTitle>
              <CardDescription>AI-optimized version of your post.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Textarea readOnly value={result?.improvedContent} className="h-96 text-sm" />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Suggestions</CardTitle>
              <CardDescription>Specific recommendations for improvement.</CardDescription>
            </CardHeader>
            <CardContent>
            {isLoading ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ul className="space-y-3">
                    {result?.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{suggestion}</span>
                        </li>
                    ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
