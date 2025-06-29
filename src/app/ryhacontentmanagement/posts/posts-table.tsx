"use client";

import { useState, useMemo } from "react";
import type { Post, Category } from "@/lib/types";
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
  Search,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostsTableProps {
  posts: Post[];
  categories: Category[];
}

type SortKey = 'title' | 'views' | 'publishedAt';
type SortDirection = 'asc' | 'desc';

export default function PostsTable({ posts, categories }: PostsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'publishedAt',
    direction: 'desc',
  });

  const filteredAndSortedPosts = useMemo(() => {
    let filteredPosts = [...posts];

    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterValue !== 'all') {
      if (filterValue === 'featured') {
        filteredPosts = filteredPosts.filter(post => post.isFeatured);
      } else {
        filteredPosts = filteredPosts.filter(post => post.category.id === filterValue);
      }
    }

    filteredPosts.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === 'asc' ? 1 : -1;

      if (key === 'views') {
        const aValue = a.views ?? 0;
        const bValue = b.views ?? 0;
        return (aValue - bValue) * direction;
      }
      if (key === 'publishedAt') {
        const aValue = new Date(a.publishedAt).getTime();
        const bValue = new Date(b.publishedAt).getTime();
        return (aValue - bValue) * direction;
      }
      if (key === 'title') {
        return a.title.localeCompare(b.title) * direction;
      }
      return 0;
    });

    return filteredPosts;
  }, [posts, searchTerm, filterValue, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterValue} onValueChange={setFilterValue}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">Featured</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('title')}>
                Title {getSortIndicator('title')}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">
              <div className="flex justify-end">
                <Button variant="ghost" onClick={() => requestSort('views')}>
                    Views {getSortIndicator('views')}
                </Button>
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button variant="ghost" onClick={() => requestSort('publishedAt')}>
                Published {getSortIndicator('publishedAt')}
              </Button>
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedPosts.map((post) => (
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
                        href={`/ryhacontentmanagement/stats/${post.slug}`}
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
                      <Link href={`/ryhacontentmanagement/posts/edit/${post.slug}`} className="cursor-pointer flex items-center">
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
    </div>
  );
}
