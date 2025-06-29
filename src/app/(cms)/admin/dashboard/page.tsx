import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getPosts } from "@/lib/data";
import { BookOpen, Users, BarChart } from "lucide-react";
import { Overview } from "./components/overview";
import PostListTable from "./components/post-list-table";

export default async function DashboardPage() {
    const posts = await getPosts();
    const totalPosts = posts.length;
    const totalViews = posts.reduce((acc, post) => acc + (post.views || 0), 0);
    
    // Top posts sorted by views
    const topPosts = [...posts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pageviews</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">All-time from published posts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,350</div>
                        <p className="text-xs text-muted-foreground">+18.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{totalPosts}</div>
                        <p className="text-xs text-muted-foreground">All-time published posts</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Traffic Overview</CardTitle>
                    <CardDescription>A summary of your page views over the last year.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview />
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <PostListTable
                    posts={topPosts}
                    title="Top Performing Posts"
                    description="Your most viewed posts of all time."
                />
                <PostListTable
                    posts={posts} 
                    title="Recent Posts"
                    description="Your most recently published blog posts."
                />
            </div>
        </div>
    );
}
