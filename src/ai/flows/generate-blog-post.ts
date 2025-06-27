// This file is machine-generated - edit with care!
'use server';

/**
 * @fileOverview AI-powered blog post content generator using Gemini API.
 *
 * - generateBlogPost - A function that generates blog post content.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The topic of the blog post.'),
  keywords: z.string().describe('Keywords related to the blog post, comma separated.'),
  tone: z
    .string()
    .optional()
    .describe('The desired tone of the blog post (e.g., informative, humorous, technical).'),
  length: z
    .string()
    .optional()
    .describe('The desired length of the blog post (e.g., short, medium, long).'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('The title of the generated blog post.'),
  content: z.string().describe('The generated blog post content.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const generateBlogPostPrompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: GenerateBlogPostInputSchema},
  output: {schema: GenerateBlogPostOutputSchema},
  prompt: `You are an AI blog post writer. Generate a blog post based on the provided topic, keywords, tone, and length.

Topic: {{{topic}}}
Keywords: {{{keywords}}}
Tone: {{{tone}}}
Length: {{{length}}}

Blog Post:
`, // Ensure a newline character at the end
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async input => {
    const {output} = await generateBlogPostPrompt(input);
    return output!;
  }
);
