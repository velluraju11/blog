import { getPosts } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import {
  Edit,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  Eye,
  Star,
  BarChart2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default async function ManagePostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Manage Posts</h1>
          <p className="text-muted-foreground">
            View, edit, and analyze your posts.
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">Featured</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Views</TableHead>
                <TableHead className="hidden md:table-cell">
                  Published
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className={cn(post.isFeatured && "bg-accent/50")}>
                  <TableCell className="text-center">
                    {post.isFeatured && (
                      <div className="flex justify-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {post.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{post.category.name}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right font-mono text-muted-foreground">
                    {post.views?.toLocaleString() ?? 'N/A'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(post.publishedAt), "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/stats/${post.slug}`}
                            className="cursor-pointer w-full flex items-center"
                          >
                            <BarChart2 className="mr-2 h-4 w-4" /> View Stats
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="cursor-pointer w-full flex items-center"
                          >
                            <Eye className="mr-2 h-4 w-4" /> View Post
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/edit/${post.slug}`} className="cursor-pointer flex items-center">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer flex items-center">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
