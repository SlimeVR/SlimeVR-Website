import { Component } from "solid-js";
import { Typography } from "~/components/commons/Typography";

export const NewsPageHeader: Component = () => {
  return (
    <div class="mb-6 2xl:text-center">
      <Typography
        tag="h1"
        variant="main-title"
        key="news.title"
      ></Typography>
    </div>
  );
};
