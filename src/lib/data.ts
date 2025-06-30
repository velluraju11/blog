import type { Post, Author, Category, CrewMember, RawPost } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

// This is the path to the mock database file.
const dbPath = path.join(process.cwd(), 'src', 'lib', 'data.json');

// The database structure.
interface Database {
  authors: Record<string, Author>;
  categories: Record<string, Category>;
  crewMembers: Record<string, CrewMember>;
  posts: RawPost[];
}

// readDb reads and parses the mock database file.
export async function readDb(): Promise<Database> {
  const fileContent = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(fileContent);
}

// writeDb writes the updated database object back to the file.
export async function writeDb(db: Database): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 4));
}

// This helper function "joins" the raw post data with author and category details.
function hydratePost(post: RawPost, db: Database): Post {
    return {
        ...post,
        author: db.authors[post.authorId] || db.authors['ryha-team'],
        category: db.categories[post.categoryId] || db.categories['updates'],
    };
}


export async function getPosts(): Promise<Post[]> {
  const db = await readDb();
  return db.posts
    .map(p => hydratePost(p, db))
    .filter(post => post.status === 'published' && new Date(post.publishedAt) <= new Date())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const db = await readDb();
  return db.posts
    .map(p => hydratePost(p, db))
    .filter(post => post.isFeatured && post.status === 'published' && new Date(post.publishedAt) <= new Date())
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const db = await readDb();
  const rawPost = db.posts.find(post => post.slug === slug);
  return rawPost ? hydratePost(rawPost, db) : undefined;
}

export async function getScheduledPosts(): Promise<Post[]> {
  const db = await readDb();
  return db.posts
    .map(p => hydratePost(p, db))
    .filter(post => post.status === 'scheduled')
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
}

export async function getAdminPosts(): Promise<Post[]> {
    const db = await readDb();
    const allPosts = db.posts.map(p => hydratePost(p, db));
    return allPosts
      .filter(post => post.status !== 'scheduled') // Show draft and published
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getCategories(): Promise<Category[]> {
  const db = await readDb();
  return Object.values(db.categories);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const db = await readDb();
  return db.categories[id];
}

export async function getAuthors(): Promise<Author[]> {
  const db = await readDb();
  return Object.values(db.authors);
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
  const db = await readDb();
  return db.authors[id];
}

export async function getCrewMembers(): Promise<CrewMember[]> {
  const db = await readDb();
  return Object.values(db.crewMembers).sort((a, b) => a.order - b.order);
}

export async function getCrewMemberById(id: string): Promise<CrewMember | undefined> {
  const db = await readDb();
  return db.crewMembers[id];
}
