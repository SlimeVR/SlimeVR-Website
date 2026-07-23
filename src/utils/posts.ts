import { isServer } from "solid-js/web";
import { parseMarkdownFrontMatter } from "~/utils/markdown.helper";
import type { Post } from "~/types/posts";

interface ManifestEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string | null;
}

export interface PostsManifest {
  total: number;
  pageSize: number;
  pages: number;
}

const postCache = new Map<string, Post>();

async function readPublicFile(path: string): Promise<string> {
  if (isServer) {
    const fs = await import("node:fs/promises");
    const { resolve } = await import("node:path");
    return fs.readFile(resolve(process.cwd(), "public", path), "utf-8");
  }
  const res = await fetch(`/${path}`);
  return res.text();
}

function entryToPost(entry: ManifestEntry): Post {
  return {
    slug: entry.slug,
    metadata: {
      title: entry.title,
      date: entry.date,
      description: entry.description,
      imageUrl: entry.imageUrl ?? undefined,
    },
  };
}

export async function getPostsManifest(): Promise<PostsManifest> {
  const text = await readPublicFile("posts/index.json");
  return JSON.parse(text);
}

export async function getPostsPage(page: number): Promise<Post[]> {
  const text = await readPublicFile(`posts/index-${page}.json`);
  const entries: ManifestEntry[] = JSON.parse(text);
  return entries.map(entryToPost);
}

export async function getPosts(): Promise<Post[]> {
  const manifest = await getPostsManifest();
  const all: Post[] = [];
  for (let i = 1; i <= manifest.pages; i++) {
    const page = await getPostsPage(i);
    all.push(...page);
  }
  return all;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const cached = postCache.get(slug);
    if (cached) return cached;

    const text = await readPublicFile(`posts/${slug}/${slug}.md`);
    const { attributes, body } = parseMarkdownFrontMatter(text);

    const post: Post = {
      slug,
      metadata: {
        title: attributes.title ?? "",
        date: attributes.date ?? "",
        description: attributes.description ?? "",
        imageUrl: attributes.thumbnailUrl ? `/posts/${slug}/${attributes.thumbnailUrl}` : undefined,
      },
      markdown: body,
    };

    postCache.set(slug, post);
    return post;
  } catch {
    return null;
  }
}
