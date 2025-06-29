import { getCategories, getAuthors } from "@/lib/data";
import CreatePostForm from "./create-post-form";

export default async function CreatePostPage() {
  const [categories, authors] = await Promise.all([
    getCategories(),
    getAuthors(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create New Post</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create a new blog post.
        </p>
      </div>
      <CreatePostForm categories={categories} authors={authors} />
    </div>
  );
}
