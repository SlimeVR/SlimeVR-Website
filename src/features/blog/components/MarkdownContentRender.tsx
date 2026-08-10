import { Component, Resource } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import "../emoji.css";
import { MarkdownBaseComponentOverrides } from "./MarkdownBaseComponentOverrides";

interface MarkdownContentRenderProps {
  content: string;
}

export const MarkdownContentRender: Component<MarkdownContentRenderProps> = (
  props
) => {
  return (
    <div class="prose prose-base max-w-none prose-invert">
      <SolidMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MarkdownBaseComponentOverrides}
      >
        {props.content}
      </SolidMarkdown>
    </div>
  );
};
