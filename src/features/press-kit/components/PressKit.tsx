import { translator } from "@solid-primitives/i18n";
import remarkGfm from "remark-gfm";
import { Component } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { Container, MarkdownLink } from "~/components/commons";
import { MarkdownContentRender } from "~/features/blog";

export const PressKit: Component = (props) => {
  return (
    <Container class="mt-4">
      <MarkdownContentRender content="" />
    </Container>
  );
};
