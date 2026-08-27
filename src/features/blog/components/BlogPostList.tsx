import { Component, createMemo, For, Show } from "solid-js";
import { BlogPostMetadata, BlogYearGroup } from "../blog.types";
import { A } from "@solidjs/router";
import clsx from "clsx";
import { FormattedDate } from "./FormattedDate";
import { Typography } from "~/components/commons";
import { BlogPostThumbnail } from "./BlogPostThumbnail";
import { getBlogPostThumbnailPlaceholderAttributes } from "../utils/blog.thumbnail.helper";

interface BlogPostListProps {
  yearPosts: BlogYearGroup[] | undefined;
  pageError?: unknown;
}

export const BlogPostList: Component<BlogPostListProps> = (props) => {
  return (
    <Show
      when={props.yearPosts && props.yearPosts.length > 0}
      fallback={
        <Show when={props.pageError}>
          <Typography tag="p" class="text-background-30">
            Loading posts failed
          </Typography>
        </Show>
      }
    >
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <For each={props.yearPosts}>
          {(yearGroup) => <YearGroupSection yearGroup={yearGroup} />}
        </For>
      </div>
    </Show>
  );
};

const YearGroupSection: Component<{ yearGroup: BlogYearGroup }> = (props) => {
  return (
    <>
      <Typography
        tag="h2"
        variant="section-title"
        class="col-span-1 sm:col-span-2 pl-1 pr-6 lg:mb-1 rounded-xs w-fit from-background-70/80 to-transparent bg-linear-to-r"
      >
        {props.yearGroup.year}
      </Typography>
      <For each={props.yearGroup.posts}>
        {(post) => <BlogPostCard post={post} />}
      </For>
    </>
  );
};

const BlogPostCard: Component<{ post: BlogPostMetadata }> = (props) => {
  const placeholderThumbnail = createMemo(() =>
    getBlogPostThumbnailPlaceholderAttributes(props.post.title)
  );

  return (
    <A
      href={`/blog/${props.post.postId}`}
      class={clsx(
        "group relative",
        "flex",
        "flex-col",
        "rounded-2xl",
        "overflow-hidden",
        "border",
        "border-background-50",
        "bg-background-70",
        "transition",
        "hover:bg-background-60"
      )}
    >
      <Show
        when={props.post.thumbnailUrl}
        fallback={
          <BlogPostThumbnail
            title={props.post.title}
            placeholder={placeholderThumbnail()}
          />
        }
      >
        <div class="relative w-full h-48 overflow-hidden rounded-2xl bg-background-60">
          <div
            data-testid="image-skeleton"
            class="absolute inset-0 animate-pulse bg-background-60/50"
          />

          <img
            src={props.post.thumbnailUrl}
            alt={props.post.title}
            class={clsx(
              "relative",
              "z-10",
              "w-full h-48",
              "rounded-2xl",
              "bg-background-60",
              "object-cover"
            )}
          />
        </div>
      </Show>

      <div class="px-6 py-3">
        <FormattedDate date={props.post.date} />
        <Typography
          tag="h2"
          variant="section-title"
          class="text-background-10 text-xl font-bold"
        >
          {props.post.title}
        </Typography>
        <Typography tag="p" class="text-background-30 line-clamp-4">
          {props.post.description}
        </Typography>
      </div>
    </A>
  );
};
