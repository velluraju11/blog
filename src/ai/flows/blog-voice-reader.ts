// src/ai/flows/blog-voice-reader.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for converting blog text to speech using a 'hacker' voice.
 *
 * - blogVoiceReader - A function that takes blog text as input and returns audio data in WAV format.
 * - BlogVoiceReaderInput - The input type for the blogVoiceReader function.
 * - BlogVoiceReaderOutput - The return type for the blogVoiceReader function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const BlogVoiceReaderInputSchema = z.string().describe('The text content of the blog post to be converted to speech.');
export type BlogVoiceReaderInput = z.infer<typeof BlogVoiceReaderInputSchema>;

const BlogVoiceReaderOutputSchema = z.object({
  media: z.string().describe('The audio data in WAV format as a data URI.'),
});
export type BlogVoiceReaderOutput = z.infer<typeof BlogVoiceReaderOutputSchema>;

export async function blogVoiceReader(input: BlogVoiceReaderInput): Promise<BlogVoiceReaderOutput> {
  return blogVoiceReaderFlow(input);
}

const blogVoiceReaderFlow = ai.defineFlow(
  {
    name: 'blogVoiceReaderFlow',
    inputSchema: BlogVoiceReaderInputSchema,
    outputSchema: BlogVoiceReaderOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // You can experiment with different voice names
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
