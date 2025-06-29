"use client";

import { useState } from "react";
import type { Post, Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import BlogPostCard from "@/components/blog-post-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogListProps {
  posts: Post[];
  categories: Category[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories: (Category & { isAll?: boolean })[] = [
    { id: "all", name: "All", isAll: true },
    ...categories,
  ];

  const filteredPosts = posts
    .filter(
      (post) =>
        selectedCategory === "all" || post.category.id === selectedCategory
    )
    .filter(
      (post) =>
        searchTerm.trim() === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    categoryId: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCategoryClick(categoryId);
    }
  };

  return (
    <section className="pb-12">
      <div className="mb-10 space-y-6">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, author, tag..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-center flex-wrap gap-2">
          {allCategories.map((category) => (
            <Badge
              key={category.id}
              variant={
                selectedCategory === category.id ? "default" : "secondary"
              }
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
              onClick={() => handleCategoryClick(category.id)}
              onKeyDown={(e) => handleKeyDown(e, category.id)}
              role="button"
              tabIndex={0}
              aria-pressed={selectedCategory === category.id}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={post.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-in-up"
            >
              <BlogPostCard post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground col-span-full pt-8">
            <p>No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
