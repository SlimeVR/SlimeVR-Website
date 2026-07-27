import clsx from "clsx";
import { Component, For, Show } from "solid-js";
import { Typography } from "~/components/commons/Typography";
import { NewsPost } from "~/features/news/types/newsPost.type";
import { FormattedDate } from "./FormattedDate";

interface NewsListProps {
  posts: NewsPost[] | undefined;
}

export const NewsList: Component<NewsListProps> = (props) => {
  return (
    <Show when={props.posts && props.posts.length > 0}>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <For each={props.posts}>{(post) => <NewsPostItem post={post} />}</For>
      </div>
    </Show>
  );
};

const NewsPostItem: Component<{ post: NewsPost }> = (props) => {
  return (
    <a
      href={`/news/${props.post.postId}`}
      class={clsx(
        "group relative",
        "flex",
        "flex-col",
        "rounded-2xl",
        "overflow-hidden",
        "border",
        "border-background-40",
        "bg-background-70",
        "transition",
        "hover:bg-background-60",
      )}
    >
      <img
        src={props.post.thumbnailUrl ?? "/images/nighty_floating.webp"}
        alt={props.post.title}
        loading="lazy"
        class="w-full h-48 object-cover"
      />
      <div class="px-6 py-3">
        <FormattedDate date={props.post.date} />
        <Typography tag="h2" variant="section-title" class="text-background-10 text-xl font-bold">
          {props.post.title}
        </Typography>
        <Typography tag="p" class="text-background-30">
          {props.post.description}
        </Typography>
      </div>
    </a>
  );
};
