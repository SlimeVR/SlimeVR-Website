import clsx from "clsx";
import { Component, createMemo } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import type { SolidMarkdownComponents } from "solid-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { renderEmoji } from "~/utils/markdown.helper";

interface NewsPostContentProps {
  markdown: string;
  slug: string;
}

function resolveImages(md: string, slug: string): string {
  return md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const resolved =
      src.startsWith("/") || src.startsWith("http")
        ? src
        : `/posts/${slug}/${src}`;
    return `![${alt}](${resolved})`;
  });
}

export const NewsPostContent: Component<NewsPostContentProps> = (props) => {
  const processed = createMemo(() =>
    resolveImages(renderEmoji(props.markdown), props.slug)
  );

  const components: SolidMarkdownComponents = {
    img: (p) => <img {...p} loading="lazy" />,
  };

  return (
    <div
      class={clsx(
        "prose prose-base lg:prose-xl max-w-none",
        "prose-p:text-background-10",
        "prose-headings:text-background-10 prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h1:sm:text-4xl",
        "prose-h2:text-2xl",
        "prose-h3:text-xl",
        "prose-h4:text-lg",
        "prose-a:text-background-20",
        "prose-strong:text-background-10",
        "prose-code:text-accent-background-10",
        "prose-pre:text-background-10",
        "prose-li:text-background-10",
        "prose-th:text-background-10",
        "prose-td:text-background-10",
        "prose-blockquote:text-background-10",
        "prose-slime"
      )}
    >
      <SolidMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {processed()}
      </SolidMarkdown>
    </div>
  );
};
