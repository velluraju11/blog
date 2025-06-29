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
  description: z.string().optional().describe('Specific instructions for the AI, which may include image placeholders like [image - your image prompt].'),
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
      description: GenerateBlogPostInputSchema.shape.description,
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
2.  Follow any specific instructions provided in the 'Instructions' section below.
3.  Naturally integrate the given keywords throughout the title, headings, and body text for SEO purposes. Avoid keyword stuffing.
4.  Write in a tone that is {{{tone}}}, aligning with Ryha's brand: powerful, visionary, and slightly rebellious.
5.  The post should be of {{{length}}} length.
6.  The content MUST be formatted in clean HTML. Use headings (h2, h3), paragraphs (p), and lists (ul, ol, li) to structure the content for readability. Do not wrap the content in \`\`\`html.
7.  If the instructions include image placeholders like [image - a detailed prompt], leave them exactly as they are in the final content. They will be replaced later.

Topic: {{{topic}}}
Keywords: {{{keywords}}}
{{#if description}}
Instructions:
{{{description}}}
{{/if}}

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
    // Start hero image generation in parallel.
    const heroImagePromise = generateBlogImage({ topic: input.topic });

    // Generate the text content first.
    const contentResult = await generateBlogPostPrompt(input);
    const { output: textOutput } = contentResult;
    if (!textOutput) {
        throw new Error("Failed to generate blog post content.");
    }
    let { title, content } = textOutput;

    // Find all image placeholders, e.g., [image - a robot writing code]
    const imagePlaceholders = content.match(/\[image\s*-\s*(.*?)\]/g) || [];

    if (imagePlaceholders.length > 0) {
      // Extract prompts from placeholders
      const imagePrompts = imagePlaceholders.map(placeholder => 
        placeholder.match(/\[image\s*-\s*(.*?)\]/)![1].trim()
      );

      // Generate all in-post images in parallel
      const imageGenerationPromises = imagePrompts.map(prompt => 
        ai.generate({
          model: 'googleai/gemini-2.0-flash-preview-image-generation',
          prompt: `A professional and visually striking blog post image about "${prompt}". The image should be abstract or conceptual, suitable for a high-tech company blog. Avoid text and human faces.`,
          config: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        })
      );

      const imageResults = await Promise.all(imageGenerationPromises);

      // Replace placeholders with the generated images
      imageResults.forEach((result, index) => {
        const placeholder = imagePlaceholders[index];
        const imageUrl = result.media?.url;
        if (imageUrl) {
          const imageTag = `<img src="${imageUrl}" alt="${imagePrompts[index]}" class="my-6 rounded-lg shadow-md" data-ai-hint="${imagePrompts[index].split(' ').slice(0, 2).join(' ')}" />`;
          content = content.replace(placeholder, imageTag);
        } else {
          // If image generation fails for any reason, just remove the placeholder from the content.
          content = content.replace(placeholder, '');
        }
      });
    }

    // Await the hero image generation
    const heroImageResult = await heroImagePromise;
    
    return {
        title,
        content,
        imageUrl: heroImageResult.imageUrl,
    };
  }
);
