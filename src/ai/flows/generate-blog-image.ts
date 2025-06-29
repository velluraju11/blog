'use server';
/**
 * @fileOverview Generates a blog post hero image using AI.
 *
 * - generateBlogImage - A function that generates an image based on a prompt.
 * - GenerateBlogImageInput - The input type for the generateBlogImage function.
 * - GenerateBlogImageOutput - The return type for the generateBlogImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogImageInputSchema = z.object({
  topic: z.string().describe('The topic to generate an image for.'),
});
export type GenerateBlogImageInput = z.infer<typeof GenerateBlogImageInputSchema>;

const GenerateBlogImageOutputSchema = z.object({
    imageUrl: z.string().describe("The data URI of the generated image. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateBlogImageOutput = z.infer<typeof GenerateBlogImageOutputSchema>;


export async function generateBlogImage(input: GenerateBlogImageInput): Promise<GenerateBlogImageOutput> {
  return generateBlogImageFlow(input);
}


const generateBlogImageFlow = ai.defineFlow(
  {
    name: 'generateBlogImageFlow',
    inputSchema: GenerateBlogImageInputSchema,
    outputSchema: GenerateBlogImageOutputSchema,
  },
  async ({ topic }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A professional and visually striking blog post hero image about "${topic}". The image should be abstract or conceptual, suitable for a high-tech company blog. Avoid text and human faces.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
