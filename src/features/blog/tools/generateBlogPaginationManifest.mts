import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join, resolve } from "path";
import type { BlogPaginationManifest, BlogPost, BlogPostMetadata, BlogYearPaginatedGroup } from "../blog.types.ts";
import { BLOG_PAGE_SIZE, parsePostFrontMatter } from "../utils/blog.helper.ts";

const BLOG_POSTS_FOLDERS_PATH = resolve(process.cwd(), "public/blog/posts");
const BLOG_PAGINATION_OUTPUT_PATH = resolve(process.cwd(), "public/blog/pagination");
const BLOG_PAGINATION_MANIFEST_PATH = resolve(process.cwd(), "public/blog/pagination", "blog-pagination-manifest.json");
rmSync(BLOG_PAGINATION_OUTPUT_PATH, {recursive: true, force: true});

function fetchAllPosts() {
  const postsDirectories = readdirSync(BLOG_POSTS_FOLDERS_PATH, {
    withFileTypes: true,
  }).filter((item) => item.isDirectory());

  const posts: BlogPost[] = [];
  for (const directory of postsDirectories) {
    const postMdFilePath = join(BLOG_POSTS_FOLDERS_PATH, directory.name, `${directory.name}.md`);
    if (!existsSync(postMdFilePath)) throw new Error("Missing blog post file: " + postMdFilePath);

    const postFileString = readFileSync(postMdFilePath, "utf-8");
    if (postFileString === "") throw new Error("Empty blog post file: " + postMdFilePath);

    posts.push(parsePostFrontMatter(directory.name, postFileString));
  }

  posts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());

  return posts;
}

function groupPostsByYear(posts: BlogPostMetadata[]) {
  const yearlyGroups = Map.groupBy(posts, (post) => post.date.getFullYear());
  return Array.from(yearlyGroups, ([year, posts]) => ({ year, posts })).sort((a, b) => b.year - a.year);
}

function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be greater than 0.");

  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

const allPosts = fetchAllPosts();

const postsMetadata = allPosts.map((post) => post.metadata);
const postsMetadataByYears = groupPostsByYear(postsMetadata);
const paginatedPostsByYears: BlogYearPaginatedGroup[] = postsMetadataByYears.map(({ year, posts }) => ({
  year: year,
  pages: chunkArray(posts, BLOG_PAGE_SIZE).map((chunk, index) => ({
    pageNumber: index + 1,
    posts: chunk,
  })),
}));

for (const { year, pages } of paginatedPostsByYears) {
  const yearDirectoryPath = join(BLOG_PAGINATION_OUTPUT_PATH, String(year));
  mkdirSync(yearDirectoryPath, { recursive: true });

  for (const { pageNumber, posts } of pages) {
    const pageFilePath = join(yearDirectoryPath, `page-${pageNumber}.json`);
    writeFileSync(pageFilePath, JSON.stringify(posts));
  }
}

const paginationManifest: BlogPaginationManifest = {
  pageCountPerYear: paginatedPostsByYears.map(({ year, pages }) => ({
    year,
    pagesCount: pages.length,
    postsCount: pages.reduce((count, page) => count + page.posts.length, 0)
  })),
  totalPosts: allPosts.length,
  latestPostYear: paginatedPostsByYears.reduce((max, posts) => Math.max(max, posts.year), -Infinity),
  generatedAt: new Date().toISOString(),
};
writeFileSync(BLOG_PAGINATION_MANIFEST_PATH, JSON.stringify(paginationManifest));

console.info(
  `Generated blog pagination manifest with: ${paginationManifest.pageCountPerYear.map((year) => `\n[year: ${year.year}] ${year.pagesCount} page(s)`)}.`
);
