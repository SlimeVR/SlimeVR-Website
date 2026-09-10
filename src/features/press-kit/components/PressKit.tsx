import { translator } from "@solid-primitives/i18n";
import remarkGfm from "remark-gfm";
import { Component } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { Container, MarkdownLink } from "~/components/commons";
import { MarkdownContentRender } from "~/features/blog";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { markdown as PressKitContent } from "../data/PressKit.md"

export const PressKit: Component = (props) => {
  return (
    <Container class="mt-4">
    <div class="prose prose-base max-w-none prose-invert">
      <SolidMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={MarkdownBaseComponentOverrides({ postId: "press" })}
      >
        {PressKitContent}
      </SolidMarkdown>
    </div>
    </Container>
  );
};
