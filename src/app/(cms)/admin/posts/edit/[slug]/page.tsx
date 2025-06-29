import { getCategories, getAuthors, getPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import EditPostForm from "./edit-post-form";

type Props = {
    params: { slug: string };
};

export default async function EditPostPage({ params }: Props) {
  const [post, categories, authors] = await Promise.all([
    getPostBySlug(params.slug),
    getCategories(),
    getAuthors(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Edit Post</h1>
        <p className="text-muted-foreground truncate">
          Editing: {post.title}
        </p>
      </div>
      <EditPostForm post={post} categories={categories} authors={authors} />
    </div>
  );
}
