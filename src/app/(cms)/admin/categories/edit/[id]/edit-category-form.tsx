"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Category } from '@/lib/types';
import { updateCategory } from '../../actions';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
});

type FormData = z.infer<typeof formSchema>;

interface EditCategoryFormProps {
    category: Category;
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: category.id,
      name: category.name,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
        await updateCategory(data);
        toast({
            title: 'Category Updated!',
            description: `The category "${data.name}" has been updated.`,
        });
    } catch(error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to update category.',
        });
        setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Artificial Intelligence" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
