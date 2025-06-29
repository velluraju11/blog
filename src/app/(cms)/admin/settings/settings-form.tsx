"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Save, KeyRound, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createClient } from '@/lib/supabase/client';

const settingsFormSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }).optional().or(z.literal('')),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
});


type SettingsFormData = z.infer<typeof settingsFormSchema>;

export default function SettingsForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: SettingsFormData) => {
        if (!data.newPassword) {
            toast({
                title: "No Changes",
                description: "You did not enter a new password.",
            });
            return;
        }

        setIsLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password: data.newPassword });
        setIsLoading(false);

        if (error) {
            toast({
                variant: "destructive",
                title: "Error Updating Password",
                description: error.message,
            });
        } else {
            toast({
                title: "Password Updated!",
                description: "Your password has been changed successfully.",
            });
            form.reset({ 
                newPassword: '', 
                confirmPassword: '' 
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your login password. Your new password must be at least 8 characters long.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="A new secure password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm the new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><KeyRound /> API Configuration</CardTitle>
                            <CardDescription>
                                For AI features to work, your Google AI API key must be securely stored as an environment variable on the server.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Server-Side Configuration</AlertTitle>
                                <AlertDescription>
                                    <ol className="list-decimal pl-4 space-y-1 mt-2 text-xs">
                                        <li>Create a file named `.env` in the root of your project.</li>
                                        <li>Add the following line to it:</li>
                                        <li className="!mt-0"><code className="bg-muted text-muted-foreground font-mono p-1 rounded-sm text-[10px]">GOOGLE_API_KEY=your_api_key_here</code></li>
                                        <li>Restart your application server to apply the changes.</li>
                                    </ol>
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
