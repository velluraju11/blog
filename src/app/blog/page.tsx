import { getCategories, getPosts } from "@/lib/data";
import BlogList from "./components/blog-list";

export default async function BlogPage() {
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="text-center pb-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Ryha Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Dispatches on AI, security, and the future of autonomous systems.
            </p>
        </section>
        
        <BlogList posts={posts} categories={categories} />
    </div>
  );
}
