"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterForm() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    if (email) {
      console.log("Newsletter subscription for:", email);
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing to the Ryha Pulse newsletter.",
      });
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="flex-1 bg-background/50"
      />
      <Button type="submit" size="sm">Subscribe</Button>
    </form>
  );
}
