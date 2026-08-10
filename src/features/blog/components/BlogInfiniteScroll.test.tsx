import { Route, Router } from "@solidjs/router";
import { cleanup, render, screen, waitFor } from "@solidjs/testing-library";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BlogPaginationManifest, BlogPostMetadata } from "../blog.types";
import {
  getBlogPaginationManifest,
  getYearPagePosts,
} from "../utils/blog.helper";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { I18nProvider } from "~/i18n";
import { BlogInfiniteScroll } from "./BlogInfiniteScroll";

const mockPageSize = 20;
const mockManifest: BlogPaginationManifest = {
  pageCountPerYear: [
    { year: 2026, pagesCount: 1, postsCount: mockPageSize },
    { year: 2025, pagesCount: 2, postsCount: mockPageSize * 2 },
  ],
  totalPosts: mockPageSize * 3,
  latestPostYear: 2026,
  generatedAt: "some date",
};

const mockPage = (postCount: number, startPostId: number): BlogPostMetadata[] =>
  Array.from({ length: postCount }, (_, i) => ({
    postId: `test-post-title-${startPostId + i}`,
    date: new Date("2025-01-02T03:04:05.123Z"),
    title: `Test Post Title ${startPostId - i}`,
    description: "Test Post description",
    thumbnailUrl: `/random/image-${startPostId + i}.webp`,
  }));

vi.mock("../utils/blog.helper", () => ({
  getBlogPaginationManifest: vi.fn(),
  getYearPagePosts: vi.fn(),
}));

const renderBlogInfiniteScroll = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });

  return render(() => (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Router>
          <Route path="/" component={BlogInfiniteScroll} />
        </Router>
      </I18nProvider>
    </QueryClientProvider>
  ));
};

let observerInstances: Array<{
  callback: (entries: IntersectionObserverEntry[]) => void;
  targets: Set<Element>;
}> = [];

class MockIntersectionObserver {
  targets = new Set<Element>();
  constructor(
    private callback: (entries: IntersectionObserverEntry[]) => void
  ) {
    observerInstances.push({ callback: this.callback, targets: this.targets });
  }
  observe(target: Element) {
    this.targets.add(target);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

const installIntersectionObserverMock = () => {
  observerInstances = [];

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
};

const getPostCount = (container: HTMLElement) =>
  container.querySelectorAll("a[href^='/blog/test-post-title-']").length;

const sentinels = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[aria-hidden="true"].h-4'));

const fireIntersection = (target: Element, isIntersecting: boolean) => {
  observerInstances.forEach(({ callback, targets }) => {
    if (targets.has(target)) {
      callback([{ isIntersecting, target } as IntersectionObserverEntry]);
    }
  });
};

describe("BlogInfiniteScroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, "", "/");
    vi.mocked(getBlogPaginationManifest).mockResolvedValue(mockManifest);
    vi.mocked(getYearPagePosts).mockResolvedValue(mockPage(mockPageSize, 200));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("fetches initial page on mount", async () => {
    renderBlogInfiniteScroll();

    await waitFor(() => {
      expect(getYearPagePosts).toHaveBeenCalledTimes(1);
      expect(getYearPagePosts).toHaveBeenCalledWith(2026, 1);
    });
  });

  it("paginates until end banner renders", async () => {
    installIntersectionObserverMock();
    const { container } = renderBlogInfiniteScroll();
    await waitFor(() => expect(getPostCount(container)).toBe(mockPageSize));

    // hit end of loaded posts, fetch 2025 page 1
    let [sentinel] = sentinels(container);
    expect(sentinel).toBeTruthy();
    fireIntersection(sentinel, true);
    await waitFor(() => expect(getPostCount(container)).toBe(mockPageSize * 2));

    // hit end of loaded posts, fetch 2025 page 2
    [sentinel] = sentinels(container);
    expect(sentinel).toBeTruthy();
    fireIntersection(sentinel, true);

    // finish loading pages, display end of posts component
    await waitFor(() => expect(getPostCount(container)).toBe(mockPageSize * 3));
    expect(getYearPagePosts).toHaveBeenCalledTimes(3);
    expect(vi.mocked(getYearPagePosts).mock.calls).toEqual([
      [2026, 1],
      [2025, 1],
      [2025, 2],
    ]);
    expect(screen.getByText(/the end of post history/)).toBeInTheDocument();
    expect(sentinels(container).length).toBe(0);
  });
});
