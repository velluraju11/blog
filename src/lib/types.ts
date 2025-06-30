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

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  order: number;
}

// This represents the data as stored in data.json
export interface RawPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  publishedAt: string;
  status: 'published' | 'draft' | 'scheduled';
  focusKeyword?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  views?: number;
  ratings?: {
    '😠': number;
    '😕': number;
    '🤔': number;
    '😊': number;
    '😍': number;
  };
}

// This represents the "hydrated" post with full author and category objects.
export interface Post extends Omit<RawPost, 'authorId' | 'categoryId'> {
  author: Author;
  category: Category;
}
