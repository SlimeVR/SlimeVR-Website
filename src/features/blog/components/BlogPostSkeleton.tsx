import { Component } from "solid-js";

export const BlogPostSkeleton: Component = () => {
  return (
    <div class="border-background-40 bg-background-70 flex flex-col overflow-hidden rounded-2xl border">
      <div class="bg-background-60 relative h-48 w-full overflow-hidden rounded-2xl">
        <div class="bg-background-60/50 absolute inset-0 animate-pulse" />
      </div>
      <div class="flex flex-col gap-2 px-6 py-3">
        <div class="bg-background-60 h-3 w-24 animate-pulse rounded"></div>
        <div class="bg-background-60 h-5 w-3/4 animate-pulse rounded"></div>
        <div class="bg-background-60 h-3 w-full animate-pulse rounded"></div>
        <div class="bg-background-60 h-3 w-2/3 animate-pulse rounded"></div>
      </div>
    </div>
  );
};
