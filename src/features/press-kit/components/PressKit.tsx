import { translator } from "@solid-primitives/i18n";
import remarkGfm from "remark-gfm";
import { Component } from "solid-js";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Container } from "~/components/commons";

export const PressKit: Component = (props) => {
  return (
    <Container class="mt-4">
      <div class="prose prose-base max-w-none prose-invert"></div>
    </Container>
  );
};
