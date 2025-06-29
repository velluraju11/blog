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

const settingsFormSchema = z.object({
  currentPassword: z.string().optional(),
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
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Current password is required to set a new one.",
    path: ["currentPassword"],
});


type SettingsFormData = z.infer<typeof settingsFormSchema>;

export default function SettingsForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: SettingsFormData) => {
        setIsLoading(true);
        // In a real app, you would make an API call to a secure endpoint.
        // For this prototype, we'll just simulate the action.
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedFields = [];
        if (data.newPassword && data.currentPassword) {
            updatedFields.push("password");
        }
        
        let toastDescription = "No changes were made.";
        if (updatedFields.length > 0) {
            toastDescription = `Your ${updatedFields.join(' and ')} has been updated (simulated).`;
        }

        toast({
            title: "Settings Saved!",
            description: toastDescription,
        });

        setIsLoading(false);
        // Reset fields for sensitive data
        form.reset({ 
            currentPassword: '', 
            newPassword: '', 
            confirmPassword: '' 
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your login password. Leave fields blank to keep your current password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
