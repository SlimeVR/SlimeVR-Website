import type {
  BlogPaginationManifest,
  BlogPost,
  BlogPostMetadata,
} from "../blog.types.ts";
import { isServer } from "solid-js/web";
import fm from "front-matter";
import { dump } from "js-yaml";

export const BLOG_PAGE_SIZE = 20;

const blogPostsCache: Map<string, BlogPost> = new Map();
let cacheManifestGeneratedAt: string | null = null;

async function fetchPublicFileAsync(path: string): Promise<string> {
  if (isServer) {
    const { readFileSync } = await import("fs");
    return readFileSync(process.cwd() + `/public/${path}`, "utf-8");
  }

  return fetch(`/${path}`, { cache: "no-cache" }).then((res) => res.text());
}

export async function getBlogPaginationManifest(): Promise<BlogPaginationManifest> {
  const manifestContent = await fetchPublicFileAsync(
    "blog/pagination/blog-pagination-manifest.json"
  );

  const manifest: BlogPaginationManifest = JSON.parse(manifestContent);

  if (manifest.generatedAt != cacheManifestGeneratedAt) {
    blogPostsCache.clear();
    cacheManifestGeneratedAt = manifest.generatedAt;
  }

  return manifest;
}

export async function getYearPagePosts(
  year: number,
  pageNumber: number
): Promise<BlogPostMetadata[]> {
  const fileString = await fetchPublicFileAsync(
    `blog/pagination/pages/${year}/page-${pageNumber}.json`
  );

  const postsByYear: BlogPostMetadata[] = JSON.parse(fileString);
  postsByYear.forEach(
    (yearPosts) => (yearPosts.date = new Date(yearPosts.date))
  );

  return postsByYear;
}

export function parsePostFrontMatter(
  postId: string,
  fileString: string
): BlogPost {
  const { attributes, body } = fm<Record<string, string>>(fileString);
  if (isNaN(new Date(attributes.date).getTime()))
    throw new Error(`Post: ${postId}: Incorrect date: ${attributes.date}`);

  const metadata: BlogPostMetadata = {
    postId: postId,
    date: new Date(attributes.date),
    title: attributes.title ?? "",
    description: attributes.description ?? "",
    thumbnailUrl: resolveAssetPath(attributes.postId, attributes.thumbnailUrl),
  };

  return { metadata, content: body };
}

export async function getBlogPost(postId: string): Promise<BlogPost> {
  const cachedPost = blogPostsCache.get(postId);
  if (cachedPost) {
    return cachedPost;
  }

  const filePath = `blog/posts/${postId}/${postId}.md`;
  const fileContent = await fetchPublicFileAsync(filePath);
  const post = parsePostFrontMatter(postId, fileContent);

  blogPostsCache.set(postId, post);
  return post;
}

export function sanitizeFrontMatter(fileString: string): string {
  const { attributes, body } = fm<Record<string, any>>(fileString);
  if (Object.keys(attributes).length === 0) return fileString;

  const cleanYaml = dump(attributes).trim();
  return `---\n${cleanYaml}\n---\n${body}`;
}

export function resolveAssetPath(
  postId: string,
  thumbnailUrl: string
): string | undefined {
  if (thumbnailUrl == undefined) return undefined;

  if (thumbnailUrl.startsWith("/public")) return thumbnailUrl;

  return `blog/posts/${postId}/${thumbnailUrl}`;
}
