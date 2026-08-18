import { readdirSync, readFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import type { BlogPost } from "../blog.types.ts";
import { parsePostFrontMatter } from "../utils/blog.helper.ts";

const BLOG_POSTS_FOLDERS_PATH = resolve(process.cwd(), "public/blog/posts");

export function fetchAllBlogPosts(): BlogPost[] {
  const postsDirectories = readdirSync(BLOG_POSTS_FOLDERS_PATH, {
    withFileTypes: true,
  }).filter((item) => item.isDirectory());

  const posts: BlogPost[] = [];
  for (const directory of postsDirectories) {
    const postMdFilePath = join(
      BLOG_POSTS_FOLDERS_PATH,
      directory.name,
      `${directory.name}.md`
    );
    if (!existsSync(postMdFilePath))
      throw new Error("Missing blog post file: " + postMdFilePath);

    const postFileString = readFileSync(postMdFilePath, "utf-8");
    if (postFileString === "")
      throw new Error("Empty blog post file: " + postMdFilePath);

    posts.push(parsePostFrontMatter(directory.name, postFileString));
  }

  posts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());

  return posts;
}


export function getLatestBlogPostDate(allBlogPosts: BlogPost[]) {
  const latestBlogPostDate = allBlogPosts[0]?.metadata.date;

  if (
    !(latestBlogPostDate instanceof Date) ||
    Number.isNaN(latestBlogPostDate.getTime())
  ) {
    throw new Error(
      `Malformed blog post record. Failed to access date.\n${JSON.stringify(allBlogPosts[0]?.metadata)}`
    );
  }

  return latestBlogPostDate.toISOString();
}