import type { BlogPaginationManifest, BlogPostMetadata } from "../blog.types";
import {
  getBlogPaginationManifest,
  getYearPagePosts,
} from "./blog.helper";

type BlogPageParam = {
  year: number;
  page: number;
};

type BlogPostsPage = {
  posts: BlogPostMetadata[];
  year: number;
  page: number;
};

export function BlogManifestQueryOptions() {
  return {
    queryKey: ["blog-manifest"],
    queryFn: getBlogPaginationManifest,
    staleTime: Infinity,
  };
}

export function blogPostInfiniteQueryOptions(manifest: BlogPaginationManifest) {
  return {
    queryKey: ["blog-posts-infinite"],
    queryFn: async ({ pageParam }: { pageParam: BlogPageParam }) => {
      const posts = await getYearPagePosts(pageParam.year, pageParam.page);
      return { posts, year: pageParam.year, page: pageParam.page };
    },
    initialPageParam: {
      year: manifest.latestPostYear,
      page: 1,
    } satisfies BlogPageParam,
    getNextPageParam: (
      _lastPage: BlogPostsPage,
      _allPages: BlogPostsPage[],
      lastPageParam: BlogPageParam
    ) => {
      const currentYear = manifest.pageCountPerYear.find(
        (year) => year.year === lastPageParam.year
      );
      if (currentYear && lastPageParam.page < currentYear.pagesCount) {
        return { year: lastPageParam.year, page: lastPageParam.page + 1 };
      }
      const currentYearIndex = manifest.pageCountPerYear.findIndex(
        (year) => year.year === lastPageParam.year
      );
      const nextYear = manifest.pageCountPerYear[currentYearIndex + 1];
      return nextYear ? { year: nextYear.year, page: 1 } : undefined;
    },
    staleTime: Infinity,
  };
}
