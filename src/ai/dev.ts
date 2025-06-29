import { config } from 'dotenv';
config();

import '@/ai/flows/generate-blog-post.ts';
import '@/ai/flows/blog-voice-reader.ts';
import '@/ai/flows/ai-blog-assistant.ts';
import '@/ai/flows/generate-blog-image.ts';
