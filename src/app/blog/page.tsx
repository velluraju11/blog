import { getCategories, getPosts } from "@/lib/data";
import BlogPostCard from "@/components/blog-post-card";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";

export default async function BlogPage() {
  const posts = await getPosts();
  const allCategories = await getCategories();
  const categories: (Category & { isAll?: boolean })[] = [{ id: 'all', name: 'All', isAll: true }, ...allCategories];


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="text-center pb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Ryha Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Dispatches on AI, security, and the future of autonomous systems.
            </p>
        </section>

        <section className="pb-12">
            <div className="flex justify-center flex-wrap gap-2 mb-12">
                {categories.map(category => (
                    <Badge key={category.id} variant={category.isAll ? 'default' : 'secondary'} className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm">{category.name}</Badge>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <div key={post.id} style={{ animationDelay: `${index * 100}ms`}} className="animate-fade-in-up">
                    <BlogPostCard post={post} />
                    </div>
                ))}
            </div>
        </section>
    </div>
  );
}
