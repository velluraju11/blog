export interface Category {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  author: Author;
  category: Category;
  tags: string[];
  publishedAt: string;
  focusKeyword?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
}
