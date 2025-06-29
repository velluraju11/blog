import { getPostBySlug, getPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Metadata } from "next";
import VoiceReader from "./components/voice-reader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} | Ryha Pulse`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    keywords: post.tags.join(', '),
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Sanitize the content for the voice reader to remove Markdown/HTML artifacts.
  const textForVoiceReader = post.content
    .replace(/```[\s\S]*?```/g, ' ') // Remove code blocks
    .replace(/#+ /g, '') // Remove markdown headers
    .replace(/> /g, '') // Remove markdown blockquote markers
    .replace(/(\*|_|`)/g, '') // Remove other markdown characters
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert markdown links to just text
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s{2,}/g, ' ') // Collapse whitespace
    .trim();


  return (
    <article className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="mb-4">
            <Badge variant="default">{post.category.name}</Badge>
          </div>
          <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <span>•</span>
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</time>
          </div>
        </header>

        <div className="relative mb-8">
            <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={630}
                data-ai-hint={post.imageHint}
                className="rounded-lg shadow-lg w-full"
                priority
            />
        </div>
        
        <div className="prose dark:prose-invert">
            <VoiceReader textToRead={textForVoiceReader} />
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}></div>
        </div>

        <div className="my-8 flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </div>

        <Card className="mt-12 bg-card/50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><MessageSquare className="w-6 h-6" /> Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Comments are currently disabled. Join the conversation on our social channels.</p>
          </CardContent>
        </Card>

      </div>
    </article>
  );
}
