import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getPosts } from "@/lib/data";
import BlogPostCard from "@/components/blog-post-card";
import { Badge } from "@/components/ui/badge";

const categories = ["AI", "CVE", "Pentesting", "Exploits", "Cyberwarfare", "Updates"];

export default async function Home() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-16 md:py-24 animate-fade-in-up">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Ryha <span className="text-primary">Pulse</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your source for cutting-edge IT insights, security alerts, and exploit analysis. Stay ahead of the curve.
        </p>
        <div className="mt-8 max-w-lg mx-auto flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search CVE, exploits, articles..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="py-12">
        <h2 className="font-headline text-3xl font-bold text-center mb-4">Latest Posts</h2>
        <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map(category => (
                <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">{category}</Badge>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <div key={post.id} style={{ animationDelay: `${index * 100}ms`}} className="animate-fade-in-up">
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
