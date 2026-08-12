import { Component } from "solid-js";

export const BlogPostSkeleton: Component = () => {
  return (
    <div class="flex flex-col rounded-2xl overflow-hidden border border-background-40 bg-background-70">
      <div class="relative w-full h-48 overflow-hidden rounded-2xl bg-background-60">
        <div class="absolute inset-0 animate-pulse bg-background-60/50" />
      </div>
      <div class="px-6 py-3 flex flex-col gap-2">
        <div class="h-3 w-24 bg-background-60 animate-pulse rounded"></div>
        <div class="h-5 w-3/4 bg-background-60 animate-pulse rounded"></div>
        <div class="h-3 w-full bg-background-60 animate-pulse rounded"></div>
        <div class="h-3 w-2/3 bg-background-60 animate-pulse rounded"></div>
      </div>
    </div>
  );
};
