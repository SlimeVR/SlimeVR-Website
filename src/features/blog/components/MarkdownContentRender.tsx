import { Component } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { MarkdownBaseComponentOverrides } from "./markdown/MarkdownBaseComponentOverrides";

interface MarkdownContentRenderProps {
  postId: string;
  content: string;
}

export const MarkdownContentRender: Component<MarkdownContentRenderProps> = (
  props
) => {
  return (
    <div class="prose prose-base max-w-none prose-invert">
      <SolidMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={MarkdownBaseComponentOverrides({ postId: props.postId })}
      >
        {props.content}
      </SolidMarkdown>
    </div>
  );
};
