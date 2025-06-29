"use client";

import { useState } from "react";
import type { Post, Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import BlogPostCard from "@/components/blog-post-card";

interface BlogListProps {
  posts: Post[];
  categories: Category[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allCategories: (Category & { isAll?: boolean })[] = [
    { id: "all", name: "All", isAll: true },
    ...categories,
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category.id === selectedCategory);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, categoryId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryClick(categoryId);
    }
  }

  return (
    <section className="pb-12">
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {allCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "secondary"}
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
          <div className="text-center text-muted-foreground col-span-full">
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
