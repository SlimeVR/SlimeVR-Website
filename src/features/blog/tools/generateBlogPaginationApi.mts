import {
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  rmSync,
} from "fs";
import { join, resolve } from "path";
import type {
  BlogPaginationManifest,
  BlogPost,
  BlogPostMetadata,
  BlogYearPaginatedGroup,
} from "../blog.types.ts";
import { BLOG_PAGE_SIZE } from "../utils/blog.helper.ts";
import { getAllBlogPosts } from "./blogPosts.helper.ts";

const BLOG_PAGINATION_OUTPUT_PATH = resolve(
  process.cwd(),
  "public/blog/pagination"
);
const BLOG_PAGINATION_PAGES_OUTPUT_PATH = resolve(
  BLOG_PAGINATION_OUTPUT_PATH,
  "pages"
);
const BLOG_PAGINATION_MANIFEST_PATH = resolve(
  BLOG_PAGINATION_OUTPUT_PATH,
  "blog-pagination-manifest.json"
);
rmSync(BLOG_PAGINATION_PAGES_OUTPUT_PATH, { recursive: true, force: true });

function groupPostsByYear(posts: BlogPostMetadata[]) {
  const yearlyGroups = Map.groupBy(posts, (post) => post.date.getFullYear());
  return Array.from(yearlyGroups, ([year, posts]) => ({ year, posts })).sort(
    (a, b) => b.year - a.year
  );
}

function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be greater than 0.");

  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

function calculatePostsByYears(allPosts: BlogPost[]) {
  const postsMetadata = allPosts.map((post) => post.metadata);
  const postsMetadataByYears = groupPostsByYear(postsMetadata);
  const paginatedPostsByYears: BlogYearPaginatedGroup[] =
    postsMetadataByYears.map(({ year, posts }) => ({
      year: year,
      pages: chunkArray(posts, BLOG_PAGE_SIZE).map((chunk, index) => ({
        pageNumber: index + 1,
        posts: chunk,
      })),
    }));
  return paginatedPostsByYears;
}

function calculateAndWritePageManifests(
  paginatedPostsByYears: BlogYearPaginatedGroup[]
) {
  for (const { year, pages } of paginatedPostsByYears) {
    const yearDirectoryPath = join(
      BLOG_PAGINATION_PAGES_OUTPUT_PATH,
      String(year)
    );
    mkdirSync(yearDirectoryPath, { recursive: true });

    for (const { pageNumber, posts } of pages) {
      const pageFilePath = join(yearDirectoryPath, `page-${pageNumber}.json`);
      writeFileSync(pageFilePath, JSON.stringify(posts));
    }
  }
}

function readMainManifestFile(): BlogPaginationManifest | null {
  if (existsSync(BLOG_PAGINATION_MANIFEST_PATH)) {
    return JSON.parse(readFileSync(BLOG_PAGINATION_MANIFEST_PATH, "utf-8"));
  }
  return null;
}

function calculateAndWriteMainManifest(
  paginatedPostsByYears: BlogYearPaginatedGroup[],
  allPosts: BlogPost[]
) {
  const existingManifest = readMainManifestFile();

  const paginationManifest: BlogPaginationManifest = {
    pageCountPerYear: paginatedPostsByYears.map(({ year, pages }) => ({
      year,
      pagesCount: pages.length,
      postsCount: pages.reduce((count, page) => count + page.posts.length, 0),
    })),
    totalPosts: allPosts.length,
    latestPostYear: paginatedPostsByYears.reduce(
      (max, posts) => Math.max(max, posts.year),
      -Infinity
    ),
    generatedAt: new Date().toISOString(),
  };

  if (
    existingManifest === null ||
    existingManifest!.latestPostYear != paginationManifest.latestPostYear ||
    existingManifest!.totalPosts != paginationManifest.totalPosts ||
    existingManifest!.latestPostYear != paginationManifest.latestPostYear
  ) {
    writeFileSync(
      BLOG_PAGINATION_MANIFEST_PATH,
      JSON.stringify(paginationManifest)
    );
  }
  return paginationManifest;
}

const allPosts = getAllBlogPosts();
const paginatedPostsByYears: BlogYearPaginatedGroup[] =
  calculatePostsByYears(allPosts);
calculateAndWritePageManifests(paginatedPostsByYears);

const paginationManifest: BlogPaginationManifest =
  calculateAndWriteMainManifest(paginatedPostsByYears, allPosts);

const yearToPagesString = paginationManifest.pageCountPerYear
  .map(
    (year, i, arr) =>
      `${arr.length - 1 === i ? "└─" : "├─"} [year: ${year.year}] ${year.pagesCount} page(s)`
  )
  .join(" \n");
console.info(`Generated blog pagination manifest:\n${yearToPagesString}\n`);
