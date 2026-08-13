import { Show, createMemo, createSignal } from "solid-js";
import { createInfiniteQuery, createQuery } from "@tanstack/solid-query";
import {
  BlogPaginationManifest,
  BlogPostMetadata,
  BlogYearGroup,
} from "../blog.types";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import { BlogPostListSkeleton } from "./BlogPostListSkeleton";
import { BlogPostList } from "./BlogPostList";
import { BlogEndBanner } from "./BlogEndBanner";
import {
  BlogManifestQueryOptions,
  blogPostInfiniteQueryOptions,
} from "../utils/blog.queries";

export function BlogInfiniteScroll() {
  const manifestQuery = createQuery(() => BlogManifestQueryOptions());

  return (
    <Show
      when={manifestQuery.status === "success"}
      fallback={
        <Show
          when={manifestQuery.isError}
          fallback={<BlogPostListSkeleton count={8} />}
        >
          <BlogPostList yearPosts={undefined} pageError={manifestQuery.error} />
        </Show>
      }
    >
      <BlogInfiniteQuery manifest={manifestQuery.data!} />
    </Show>
  );
}

function BlogInfiniteQuery({ manifest }: { manifest: BlogPaginationManifest }) {
  const postsQuery = createInfiniteQuery(() =>
    blogPostInfiniteQueryOptions(manifest)
  );

  const [bottomSentinel, setBottomSentinel] = createSignal<HTMLElement | null>(
    null
  );
  createIntersectionObserver(
    () =>
      [bottomSentinel()].filter(
        (element): element is HTMLElement => element !== null
      ),
    ([entry]) => {
      if (
        entry?.isIntersecting &&
        postsQuery.hasNextPage &&
        !postsQuery.isFetchingNextPage
      ) {
        postsQuery.fetchNextPage();
      }
    },
    { threshold: 0 }
  );

  const yearPosts = createMemo<BlogYearGroup[]>(() => {
    if (!postsQuery.data) return [];
    const loadedPostsByYear = new Map<number, BlogPostMetadata[]>();
    for (const page of postsQuery.data.pages) {
      const yearPosts = loadedPostsByYear.get(page.year) ?? [];
      loadedPostsByYear.set(page.year, [...yearPosts, ...page.posts]);
    }
    return [...loadedPostsByYear.entries()]
      .map(([year, posts]) => ({ year, posts }))
      .sort((a, b) => b.year - a.year);
  });

  const yearPostTotalCount = () =>
    manifest.pageCountPerYear.map(({ postsCount }) => postsCount);
  const loadedPostsCount = () =>
    postsQuery.data?.pages.reduce((sum, page) => sum + page.posts.length, 0) ??
    0;

  const listSkeleton = (batchStartIndex: number = 0) => {
    const SKELETON_ITEMS_PER_BATCH = 8;
    const yearsDividerIndexes: number[] = [];
    let yearPostsLoaded = 0;

    for (const yearPostsCount of yearPostTotalCount()) {
      if (
        yearPostsLoaded >= batchStartIndex &&
        yearPostsLoaded < batchStartIndex + SKELETON_ITEMS_PER_BATCH
      ) {
        yearsDividerIndexes.push(yearPostsLoaded - batchStartIndex);
      }
      yearPostsLoaded += yearPostsCount;
    }

    return (
      <BlogPostListSkeleton
        count={SKELETON_ITEMS_PER_BATCH}
        dividerIndexes={yearsDividerIndexes}
      />
    );
  };

  return (
    <>
      <Show when={postsQuery.data != undefined} fallback={listSkeleton()}>
        <BlogPostList yearPosts={yearPosts()} pageError={postsQuery.error} />
      </Show>
      <Show when={postsQuery.isFetchingNextPage}>
        {listSkeleton(loadedPostsCount())}
      </Show>

      <Show when={postsQuery.hasNextPage}>
        <div ref={setBottomSentinel} class="h-4" aria-hidden="true" />
      </Show>

      <Show
        when={
          !postsQuery.hasNextPage &&
          postsQuery.data !== undefined &&
          !postsQuery.isError
        }
      >
        <BlogEndBanner />
      </Show>
    </>
  );
}
