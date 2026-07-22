import { Component } from "solid-js";
import { Typography } from "~/components/commons/Typography";

interface NewsPostHeaderProps {
  title: string;
  date: string;
  description: string;
}

export const NewsPostHeader: Component<NewsPostHeaderProps> = (props) => {
  return (
    <div class="relative overflow-clip rounded-xl">
      <div class="absolute inset-0 opacity-25 pattern" />
      <div class="relative flex flex-col gap-3">
        <Typography tag="p" class="text-xs tracking-widest uppercase text-background-30 font-medium">
          {props.date}
        </Typography>
        <Typography tag="h1" class="text-3xl sm:text-4xl font-bold leading-tight text-background-10">
          {props.title}
        </Typography>
        <Typography tag="p" class="text-base leading-relaxed text-background-30 max-w-3xl">
          {props.description}
        </Typography>
      </div>
    </div>
  );
};
