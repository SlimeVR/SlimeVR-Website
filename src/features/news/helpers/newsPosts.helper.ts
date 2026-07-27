import { NewsPost } from "~/features/news/types/newsPost.type";
import { NewsPagesManifest } from "../types/newsPagesManifest.type";
import { isServer } from "solid-js/web";

const newsPostCache: Map<string, NewsPost> = new Map();

async function fetchPublicFile(path: string): Promise<string> {
  if (isServer) {
    const { readFileSync } = await import("fs");
    return readFileSync(process.cwd() + `/public/${path}`, "utf-8");
  }

  return (await fetch(`/${path}`)).text();
}

export async function getPostsManifest(): Promise<NewsPagesManifest> {
  const manifestContent = await fetchPublicFile("newsPosts/manifest.json");

  return JSON.parse(manifestContent);
}

export async function getPagePosts(page: number): Promise<NewsPost[]> {
  const fileText = await fetchPublicFile(`newsPosts/page-${page}.json`);

  return JSON.parse(fileText);
}

export function parseFrontMatter(fileContent: string): { data: any; content: string } {
  const match = fileContent
    .replace(/\r\n/g, "\n") // Windows line endings fix
    .match(/^---\n(?<FrontMatter>[\s\S]*?)\n---\n+(?<MarkdownPart>[\s\S]*)/);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const data: Record<string, string> = {};
  match.groups?.FrontMatter.split("\n").forEach((line) => {
    const dividerIndex = line.indexOf(":");
    if (dividerIndex === -1) {
      return;
    }

    const key = line.slice(0, dividerIndex).trim();
    const value = line.slice(dividerIndex + 1).trim();
    data[key] =
      value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1) : value;
  });

  return { data, content: match.groups!.MarkdownPart };
}

export async function getPost(postId: string): Promise<NewsPost> {
  const cachedPost = newsPostCache.get(postId);
  if (cachedPost) {
    return cachedPost;
  }

  const filePath = `newsPosts/${postId}/${postId}.md`;
  const fileString = await fetchPublicFile(filePath);
  const { data, content } = parseFrontMatter(fileString);

  const newsPost: NewsPost = {
    postId: postId,
    date: data.date,
    title: data.title,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    markdownContent: content,
  };

  newsPostCache.set(postId, newsPost);
  return newsPost;
}