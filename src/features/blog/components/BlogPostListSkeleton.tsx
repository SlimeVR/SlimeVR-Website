import { Component, For, Show } from "solid-js";
import { BlogPostSkeleton } from "./BlogPostSkeleton";

interface PostsListSkeletonProps {
  count: number;
  dividerIndexes?: number[];
}

export const BlogPostListSkeleton: Component<PostsListSkeletonProps> = (
  props
) => {
  return (
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 py-5 mb-6">
      <For each={Array.from({ length: props.count })}>
        {(_, i) => (
          <>
            <Show when={props.dividerIndexes?.includes(i())}>
              <div
                data-testid="year-divider"
                class="col-span-1 sm:col-span-2 h-6 w-20 bg-background-60 animate-pulse rounded"
              />
            </Show>
            <BlogPostSkeleton />
          </>
        )}
      </For>
    </div>
  );
};
