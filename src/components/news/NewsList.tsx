import { Component, createMemo, createResource, createSignal, For, Show } from "solid-js";
import { Typography } from "~/components/commons/Typography";
import { NewsCard } from "~/components/news";
import type { Post } from "~/types/posts";
import type { PostsManifest } from "~/utils/posts";

interface NewsListProps {
  manifest: PostsManifest | undefined;
  initialPosts: Post[] | undefined;
}

export const NewsList: Component<NewsListProps> = (props) => {
  const [page, setPage] = createSignal(1);
  const cache = new Map<number, Post[]>();

  const totalPages = createMemo(() => props.manifest?.pages ?? 1);

  const [currentPosts] = createResource(
    () => page(),
    async (p) => {
      if (p === 1 && props.initialPosts) return props.initialPosts;
      if (cache.has(p)) return cache.get(p)!;
      const { getPostsPage } = await import("~/utils/posts");
      const posts = await getPostsPage(p);
      cache.set(p, posts);
      return posts;
    }
  );

  const pageNumbers = createMemo(() => {
    const total = totalPages();
    const current = page();
    const pages: (number | "...")[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push("...");
      pages.push(total);
    }

    return pages;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages()) return;
    setPage(p);
    scrollToTop();
  };

  return (
    <Show
      when={(props.manifest?.total ?? 0) > 0}
      fallback={
        <div class="rounded-2xl bg-background-70 border border-background-40 px-5 text-center py-10">
          <Typography tag="p" variant="section-title" key="news.none"></Typography>
          <Typography tag="p" color="secondary" class="mt-2" key="news.later"></Typography>
        </div>
      }
    >
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <For each={currentPosts()}>
          {(post) => (
            <NewsCard
              slug={post.slug}
              title={post.metadata.title}
              date={post.metadata.date}
              description={post.metadata.description}
              imageUrl={post.metadata.imageUrl}
            />
          )}
        </For>
      </div>

      <Show when={totalPages() > 1}>
        <nav class="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
          <button
            onClick={() => goToPage(page() - 1)}
            disabled={page() === 1}
            class="px-3 py-2 rounded-lg text-sm font-medium text-background-20 bg-background-70 border border-background-40 hover:bg-background-60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <For each={pageNumbers()}>
            {(p) =>
              p === "..." ? (
                <span class="px-2 py-2 text-sm text-background-30">...</span>
              ) : (
                <button
                  onClick={() => goToPage(p)}
                  class={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    p === page()
                      ? "bg-accent-background-20 text-white"
                      : "text-background-20 bg-background-70 border border-background-40 hover:bg-background-60"
                  }`}
                >
                  {p}
                </button>
              )
            }
          </For>

          <button
            onClick={() => goToPage(page() + 1)}
            disabled={page() === totalPages()}
            class="px-3 py-2 rounded-lg text-sm font-medium text-background-20 bg-background-70 border border-background-40 hover:bg-background-60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </Show>
    </Show>
  );
};
