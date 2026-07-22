import { A } from "@solidjs/router";
import clsx from "clsx";
import { Component, createMemo } from "solid-js";
import { Typography } from "~/components/commons/Typography";

interface NewsCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export const NewsCard: Component<NewsCardProps> = (props) => {
  const classes = createMemo(() =>
    clsx(
      "group relative flex flex-col rounded-2xl overflow-hidden",
      "bg-background-70 border border-background-40",
      "hover:bg-background-60",
      "transition-all duration-200 ease-standard",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-background-20"
    )
  );

  return (
    <A href={`/news/${props.slug}`} class={classes()}>
      <img
        src={props.imageUrl || "/images/nighty_floating.webp"}
        alt=""
        loading="lazy"
        class="w-full h-48 object-cover no-interact"
      />
      <div class="flex flex-col gap-1 p-4">
        <span class="text-xs font-medium text-background-30 uppercase tracking-widest">
          {props.date}
        </span>
        <Typography
          tag="h3"
          variant="section-title"
          class="text-background-10 group-hover:text-white transition-colors duration-200"
        >
          {props.title}
        </Typography>
        <Typography tag="p" class="text-sm leading-relaxed mt-1 text-background-20 line-clamp-3">
          {props.description}
        </Typography>
      </div>
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-background-10 opacity-0 transition-opacity duration-200 group-hover:opacity-[0.05] group-active:opacity-[0.08] group-focus-visible:opacity-[0.08]"
      />
    </A>
  );
};
