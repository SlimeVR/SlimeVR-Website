import { describe, expect, it, vi } from "vitest";
import { blogPostInfiniteQueryOptions } from "./blog.queries";
import type { BlogPaginationManifest } from "../blog.types";
import { BLOG_PAGE_SIZE, getYearPagePosts } from "./blog.helper";

vi.mock("./blog.helper", () => ({
  BLOG_PAGE_SIZE: 20,
  getBlogPaginationManifest: vi.fn(),
  getYearPagePosts: vi.fn(),
}));

const manifest: BlogPaginationManifest = {
  pageCountPerYear: [
    { year: 2025, pagesCount: 2, postsCount: BLOG_PAGE_SIZE * 2 },
    { year: 2024, pagesCount: 1, postsCount: BLOG_PAGE_SIZE },
  ],
  totalPosts: BLOG_PAGE_SIZE * 3,
  latestPostYear: 2025,
  generatedAt: "arbitrary date",
};

describe("blogPostInfiniteQueryOptions", () => {
  it("fetch latest posts when initialized", () => {
    const options = blogPostInfiniteQueryOptions(manifest);
    expect(options.initialPageParam).toEqual({ page: 1, year: 2025 });
  });

  it("paginate within year", () => {
    const options = blogPostInfiniteQueryOptions(manifest);
    const getNextPageParamValue = options.getNextPageParam;

    expect(
      getNextPageParamValue({ posts: [], year: 2025, page: 1 }, [], {
        year: 2025,
        page: 1,
      })
    ).toEqual({ year: 2025, page: 2 });
  });

  it("paginate between years", () => {
    const options = blogPostInfiniteQueryOptions(manifest);
    const getNextPageParamValue = options.getNextPageParam;

    expect(
      getNextPageParamValue({ posts: [], year: 2025, page: 2 }, [], {
        year: 2025,
        page: 2,
      })
    ).toEqual({ year: 2024, page: 1 });
  });

  it("correctly aggregate loaded", async () => {
    vi.mocked(getYearPagePosts).mockResolvedValue([]);

    const options = blogPostInfiniteQueryOptions(manifest);
    const result = await options.queryFn({
      pageParam: { year: 2025, page: 1 },
    });

    expect(getYearPagePosts).toHaveBeenCalledWith(2025, 1);
    expect(result).toEqual({ posts: [], year: 2025, page: 1 });
  });
});
