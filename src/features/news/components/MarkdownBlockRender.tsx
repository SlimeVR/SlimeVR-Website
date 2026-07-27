import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Component, Resource, Show } from "solid-js";
import { SolidMarkdown, SolidMarkdownComponents } from "solid-markdown";
import { Typography } from "~/components/commons/Typography";
import { NewsPost } from "../types/newsPost.type";

interface MarkdownBlockRenderProps {
  post: Resource<NewsPost>;
}

const components: SolidMarkdownComponents = {
  img: (p) => <img {...p} loading="lazy" />,
};

export const MarkdownBlockRender: Component<MarkdownBlockRenderProps> = (
  props
) => {
  return (
    <div class="prose prose-base max-w-none prose-invert">
      <Show
        when={props.post()!.markdownContent}
        fallback={<Typography tag="p">Loading post content...</Typography>}
      >
        <SolidMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {props.post()!.markdownContent}
        </SolidMarkdown>
      </Show>
    </div>
  );
};
