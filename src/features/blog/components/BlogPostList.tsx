import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import { BlogPost, BlogPostMetadata, BlogYearGroup } from "../blog.types";
import { A } from "@solidjs/router";
import clsx from "clsx";
import { FormattedDate } from "./FormattedDate";
import { Typography } from "~/components/commons";
import { SolidMarkdown, SolidMarkdownComponents } from "solid-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import "../emoji.css";
import { MarkdownBaseComponentOverrides } from "./MarkdownBaseComponentOverrides";

interface BlogPostListProps {
  yearPosts: BlogYearGroup[] | undefined;
  pageError?: unknown;
}

const componentOverrides: SolidMarkdownComponents = {
  ...MarkdownBaseComponentOverrides,
  p: (pProps) => (
    <Typography tag="p" class="text-background-30">
      {pProps.children}
    </Typography>
  ),
};

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
          {(group) => (
            <>
              <Typography
                tag="h2"
                variant="section-title"
                class="col-span-1 sm:col-span-2 text-background-10"
              >
                {group.year}
              </Typography>
              <For each={group.posts}>
                {(post) => <BlogPostCard post={post} />}
              </For>
            </>
          )}
        </For>
      </div>
    </Show>
  );
};

const BlogPostCard: Component<{ post: BlogPostMetadata }> = (props) => {
  const isPostHasImage = () => !!props.post.thumbnailUrl;
  const imageSrc = () => props.post.thumbnailUrl ?? "/images/purple_glow.webp";

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
      <div class="relative w-full h-48 overflow-hidden rounded-2xl bg-background-60">
        <div
          data-testid="image-skeleton"
          class="absolute inset-0 animate-pulse bg-background-60/50"
        />

        <img
          src={imageSrc()}
          alt={props.post.title}
          class={clsx(
            "relative z-10 w-full h-48 rounded-2xl bg-background-60",
            isPostHasImage() ? "object-cover" : "object-fill"
          )}
        />
      </div>

      <div class="px-6 py-3">
        <FormattedDate date={props.post.date} />
        <Typography
          tag="h2"
          variant="section-title"
          class="text-background-10 text-xl font-bold"
        >
          {props.post.title}
        </Typography>
        <div class="line-clamp-4">
          <SolidMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={componentOverrides}
          >
            {props.post.description}
          </SolidMarkdown>
        </div>
      </div>
    </A>
  );
};
