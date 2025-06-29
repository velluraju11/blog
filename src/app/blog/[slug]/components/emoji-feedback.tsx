"use client";

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const emojis = [
    { emoji: '😍', label: 'Loved it!' },
    { emoji: '😊', label: 'Good' },
    { emoji: '🤔', label: 'Interesting' },
    { emoji: '😕', label: 'Confusing' },
    { emoji: '😠', label: 'Didn\'t like it' },
];


export default function EmojiFeedback() {
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const handleEmojiClick = (label: string) => {
        setSubmitted(true);
        toast({
            title: "Feedback Submitted!",
            description: `You rated this post as: "${label}"`,
        });
    };

    if (submitted) {
        return (
            <div className="text-center p-4 rounded-lg bg-accent/50 text-accent-foreground font-medium my-12">
                Thanks for your feedback!
            </div>
        );
    }

    return (
        <Card className="my-12 bg-card/50">
            <CardHeader>
                <CardTitle className="font-headline text-center">How did you feel about this post?</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center gap-4 md:gap-6">
                    {emojis.map(({ emoji, label }) => (
                        <button
                            key={emoji}
                            onClick={() => handleEmojiClick(label)}
                            className="group relative"
                            aria-label={label}
                        >
                            <span className="text-3xl md:text-4xl transform transition-transform duration-200 hover:scale-125 focus:scale-125 focus:outline-none"
                            >{emoji}</span>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-sm text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
