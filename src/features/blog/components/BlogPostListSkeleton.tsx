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
    <div class="mb-6 grid grid-cols-1 gap-4 py-5 sm:grid-cols-2">
      <For each={Array.from({ length: props.count })}>
        {(_, i) => (
          <>
            <Show when={props.dividerIndexes?.includes(i())}>
              <div
                data-testid="year-divider"
                class="bg-background-60 col-span-1 h-6 w-20 animate-pulse rounded sm:col-span-2"
              />
            </Show>
            <BlogPostSkeleton />
          </>
        )}
      </For>
    </div>
  );
};
