"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Play, Pause, Volume2, XCircle } from 'lucide-react';
import { blogVoiceReader } from '@/ai/flows/blog-voice-reader';
import { useToast } from '@/hooks/use-toast';

type VoiceReaderState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export default function VoiceReader({ textToRead }: { textToRead: string }) {
  const [state, setState] = useState<VoiceReaderState>('idle');
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handlePlay = async () => {
    if (audioSrc && audioRef.current) {
      if (state === 'paused') {
        audioRef.current.play();
        setState('playing');
      } else if (state === 'playing') {
        audioRef.current.pause();
        setState('paused');
      }
      return;
    }

    setState('loading');
    try {
      const result = await blogVoiceReader(textToRead);
      if (result.media) {
        setAudioSrc(result.media);
        setState('playing');
      } else {
        throw new Error('No audio data received from the service.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      console.error('Error generating audio:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Generation Failed',
        description: `Could not generate audio. Please ensure your Google AI API key is correctly configured in the .env file. Details: ${errorMessage}`,
      });
      setState('error');
    }
  };

  const getButtonContent = () => {
    switch (state) {
      case 'loading':
        return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating</>;
      case 'playing':
        return <><Pause className="mr-2 h-4 w-4" /> Pause</>;
      case 'paused':
        return <><Play className="mr-2 h-4 w-4" /> Resume</>;
      case 'error':
        return <><XCircle className="mr-2 h-4 w-4" /> Error</>;
      case 'idle':
      default:
        return <><Volume2 className="mr-2 h-4 w-4" /> Read Aloud</>;
    }
  };

  return (
    <div className="my-6 not-prose">
      <Button onClick={handlePlay} disabled={state === 'loading' || state === 'error'}>
        {getButtonContent()}
      </Button>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          autoPlay
          onEnded={() => setState('idle')}
          onPause={() => state === 'playing' && setState('paused')}
          onPlay={() => state !== 'playing' && setState('playing')}
          className="hidden"
        />
      )}
    </div>
  );
}
