"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from '@/components/ui/form';
import { Loader2, Save, KeyRound, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const settingsFormSchema = z.object({});
type SettingsFormData = z.infer<typeof settingsFormSchema>;

export default function SettingsForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsFormSchema),
    });

    const onSubmit = async (data: SettingsFormData) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        toast({
            title: "Settings Saved!",
            description: "Your settings have been updated.",
        });
        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><KeyRound /> Environment Configuration</CardTitle>
                            <CardDescription>
                                For the app's AI features to function, your Google AI API key must be securely stored as an environment variable on the server.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Required Keys</AlertTitle>
                                <AlertDescription>
                                    <p className="mb-2 text-sm">Create a file named <code className="font-mono text-xs bg-muted p-1 rounded-sm">.env</code> in your project's root directory and add the following variable:</p>
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <p className="font-semibold">Google AI (AI Features)</p>
                                            <p className="text-xs text-muted-foreground mb-1">Get your key from Google AI Studio.</p>
                                            <code className="block bg-muted text-muted-foreground font-mono p-1 rounded-sm text-[10px]">GOOGLE_API_KEY=...</code>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs">Remember to restart your server after updating the <code className="font-mono text-xs bg-muted p-1 rounded-sm">.env</code> file.</p>
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </div>
                
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Settings
                </Button>
            </form>
        </Form>
    );
}
