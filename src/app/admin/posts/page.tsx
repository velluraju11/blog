import { getAdminPosts, getCategories } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import PostsTable from "./posts-table";

export default async function ManagePostsPage() {
  const posts = await getAdminPosts();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Manage Posts</h1>
          <p className="text-muted-foreground">
            Search, filter, and manage your posts.
          </p>
        </div>
        <Button asChild className="flex-shrink-0">
          <Link href="/admin/generate">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            A total of {posts.length} posts have been published.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostsTable posts={posts} categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
