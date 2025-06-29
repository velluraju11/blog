import { getPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Star, FolderKanban } from "lucide-react";
import FeedbackChart from "./feedback-chart";

type Props = {
  params: { slug: string };
};

export default async function PostStatsPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const emojiOrder = ['😠', '😕', '🤔', '😊', '😍'];
  const ratingsData = post.ratings ? Object.entries(post.ratings)
    .map(([emoji, count]) => ({
      name: emoji,
      count: count,
    }))
    .sort((a, b) => emojiOrder.indexOf(a.name) - emojiOrder.indexOf(b.name))
    : [];

  const totalRatings = ratingsData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Post Statistics</h1>
        <p className="text-muted-foreground truncate">For: {post.title}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{post.views?.toLocaleString() ?? 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Total page impressions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRatings.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">Total emoji feedback submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Category</CardTitle>
             <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-lg mt-2">{post.category.name}</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Feedback Ratings</CardTitle>
          <CardDescription>Breakdown of user feedback by emoji.</CardDescription>
        </CardHeader>
        <CardContent>
          {ratingsData.length > 0 ? (
            <FeedbackChart data={ratingsData} />
          ) : (
            <p className="text-muted-foreground text-center py-8">No rating data available for this post.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
