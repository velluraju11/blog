import { getScheduledPosts } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScheduledPostsTable from "./scheduled-posts-table";

export default async function SchedulerPage() {
  const scheduledPosts = await getScheduledPosts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Scheduled Posts</h1>
        <p className="text-muted-foreground">
          These posts are scheduled for future publication.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
          <CardDescription>
            You have {scheduledPosts.length} post(s) scheduled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScheduledPostsTable posts={scheduledPosts} />
        </CardContent>
      </Card>
    </div>
  );
}
