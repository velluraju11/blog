"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface PostListTableProps {
  posts: Post[];
  title: string;
  description: string;
}

const INITIAL_VISIBLE_COUNT = 7;

export default function PostListTable({ posts, title, description }: PostListTableProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visiblePosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-[200px] sm:max-w-[300px] truncate">
                  {post.title}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {post.views?.toLocaleString() ?? "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {hasMore && (
        <CardFooter className="justify-center border-t pt-4">
          <Button variant="ghost" onClick={handleViewMore}>
            View More <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
