import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { NewsPost } from "../src/features/news/types/newsPost.type";
import { parseFrontMatter } from "~/features/news/helpers/newsPosts.helper";

const PAGE_SIZE = 10;
export const newsPostsDir = join(process.cwd(), "public", "newsPosts");

const postsDirs = readdirSync(newsPostsDir, { withFileTypes: true }).filter(
  (directory) => directory.isDirectory()
);

const allPosts: NewsPost[] = fetchNewsPosts();

const chunkedPosts: { pageNumber: number; items: NewsPost[] }[] =
  chunkPostsToPages(allPosts, PAGE_SIZE);

const mainManifest = {
  totalPosts: allPosts.length,
  totalPages: chunkedPosts.length,
};
writeFileSync(
  join(newsPostsDir, "manifest.json"),
  JSON.stringify(mainManifest)
);

chunkedPosts.forEach((postsChunk) => {
  const pageNumber = postsChunk.pageNumber;
  writeFileSync(
    join(newsPostsDir, `page-${pageNumber}.json`),
    JSON.stringify(postsChunk.items, null, 2)
  );
});

console.log(
  `Generated news manifests (${mainManifest.totalPosts} posts, ${mainManifest.totalPages} pages)`
);

function chunkPostsToPages<T>(
  array: T[],
  size: number
): { pageNumber: number; items: T[] }[] {
  const chunkedArr: { pageNumber: number; items: T[] }[] = [];
  let index = 1;
  let offset = 0;
  while (offset < array.length) {
    chunkedArr.push({
      pageNumber: index,
      items: array.slice(offset, offset + size),
    });
    index++;
    offset += size;
  }
  return chunkedArr;
}

function fetchNewsPosts() {
  const allNewsPosts: NewsPost[] = [];
  for (const postDir of postsDirs) {
    const postMdFilePath = join(
      newsPostsDir,
      postDir.name,
      `${postDir.name}.md`
    );
    const postFileString = readFileSync(postMdFilePath, "utf-8");

    allNewsPosts.push(parsePostString(postFileString, postDir.name));
  }
  allNewsPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allNewsPosts;
}

function parsePostString(
  fileText: string,
  postId: string,
  includeContent: boolean = true
): NewsPost {
  const { data, content } = parseFrontMatter(fileText);

  const newsPost: NewsPost = {
    postId: postId,
    date: data.date,
    title: data.title,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    ...(includeContent && { markdownContent: content }),
  };
  return newsPost;
}
