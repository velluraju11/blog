'use server';

/**
 * @fileOverview AI-powered blog post content generator using Gemini API.
 *
 * - generateBlogPost - A function that generates blog post content and a hero image.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateBlogImage } from './generate-blog-image';

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
  imageUrl: z.string().describe("The data URI of the generated hero image."),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const generateBlogPostPrompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: z.object({
      topic: GenerateBlogPostInputSchema.shape.topic,
      keywords: GenerateBlogPostInputSchema.shape.keywords,
      tone: GenerateBlogPostInputSchema.shape.tone,
      length: GenerateBlogPostInputSchema.shape.length,
    })
  },
  output: {schema: z.object({
    title: GenerateBlogPostOutputSchema.shape.title,
    content: GenerateBlogPostOutputSchema.shape.content,
  })},
  prompt: `You are an expert SEO specialist and blog post writer for Ryha, a cutting-edge AI and cybersecurity company.

Your task is to generate a high-quality blog post that is both engaging and optimized for search engines.

Instructions:
1.  Create a compelling title and well-structured content based on the provided topic.
2.  Naturally integrate the given keywords throughout the title, headings, and body text for SEO purposes. Avoid keyword stuffing.
3.  Write in a tone that is {{{tone}}}, aligning with Ryha's brand: powerful, visionary, and slightly rebellious.
4.  The post should be of {{{length}}} length.
5.  The content MUST be formatted in clean HTML. Use headings (h2, h3), paragraphs (p), and lists (ul, ol, li) to structure the content for readability. Do not wrap the content in \`\`\`html.

Topic: {{{topic}}}
Keywords: {{{keywords}}}

Blog Post:
`,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async input => {
    // Run content and image generation in parallel
    const [contentResult, imageResult] = await Promise.all([
        generateBlogPostPrompt(input),
        generateBlogImage({ topic: input.topic }),
    ]);

    const { output } = contentResult;
    if (!output) {
        throw new Error("Failed to generate blog post content.");
    }
    
    return {
        ...output,
        imageUrl: imageResult.imageUrl,
    };
  }
);
