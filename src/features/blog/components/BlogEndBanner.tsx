import { Component } from "solid-js";
import { Typography } from "~/components/commons";

export const BlogEndBanner: Component = () => {
  return (
    <div class="flex flex-col items-center gap-3 py-8 text-center">
      <img src="/images/happy-slime.gif" alt="Happy slime" class="w-24 h-24" />
      <Typography tag="p" class="text-background-10 font-bold">Hello adventurer! You've reached the end of post history</Typography>
    </div>
  );
};
