import { Button } from "@/components/ui/button";
import { getFeaturedPosts } from "@/lib/data";
import BlogPostCard from "@/components/blog-post-card";
import Link from "next/link";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-16 md:py-24 animate-fade-in-up">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          The Digital Revolution.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Ryha builds AI-native ecosystems where machines work for you — intelligently, securely, and forever. This is not a startup. This is a rebellion.
        </p>
        <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
                <Link href="/about">Discover Ryha</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Read the Blog</Link>
            </Button>
        </div>
      </section>

      <section className="py-12">
        <h2 className="font-headline text-3xl font-bold text-center mb-10">From the Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div key={post.id} style={{ animationDelay: `${index * 100}ms`}} className="animate-fade-in-up">
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
