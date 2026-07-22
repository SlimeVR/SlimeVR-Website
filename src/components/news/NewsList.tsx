import { Component, For, Show } from "solid-js";
import { Typography } from "~/components/commons/Typography";
import { NewsCard } from "~/components/news";
import type { Post } from "~/types/posts";

interface NewsListProps {
  posts: Post[] | undefined;
}

export const NewsList: Component<NewsListProps> = (props) => {
  return (
    <Show
      when={(props.posts?.length ?? 0) > 0}
      fallback={
        <div class="rounded-2xl bg-background-70 border border-background-40 px-5 text-center py-10">
          <Typography
            tag="p"
            variant="section-title"
            key="news.none"
          ></Typography>
          <Typography
            tag="p"
            color="secondary"
            class="mt-2"
            key="news.later"
          ></Typography>
        </div>
      }
    >
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <For each={props.posts}>
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
    </Show>
  );
};
