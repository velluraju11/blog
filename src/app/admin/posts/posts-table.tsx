"use client";

import { useState, useMemo } from "react";
import type { Post } from "@/lib/types";
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
  Trash2,
  Eye,
  Star,
  BarChart2,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface PostsTableProps {
  posts: Post[];
}

type SortDirection = 'asc' | 'desc';

export default function PostsTable({ posts }: PostsTableProps) {
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);

  const sortedPosts = useMemo(() => {
    const data = [...posts];
    if (sortDirection) {
      data.sort((a, b) => {
        const aViews = a.views ?? 0;
        const bViews = b.views ?? 0;
        if (sortDirection === 'asc') {
          return aViews - bViews;
        }
        return bViews - aViews;
      });
    }
    return data;
  }, [posts, sortDirection]);

  const toggleSort = () => {
    setSortDirection(current => current === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 text-center">Featured</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden lg:table-cell text-right">
            <Button variant="ghost" onClick={toggleSort} size="sm" className="font-medium">
              <span>Views</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="hidden md:table-cell">
            Published
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPosts.map((post) => (
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
  );
}
