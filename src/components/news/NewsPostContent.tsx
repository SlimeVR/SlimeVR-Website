import { Component } from "solid-js";

interface NewsPostContentProps {
  html: string;
}

/** Renders pre-compiled `.md` HTML. Text colors via prose-* Tailwind variant classes. */
export const NewsPostContent: Component<NewsPostContentProps> = (props) => {
  return <div innerHTML={props.html} class="prose prose-base lg:prose-xl max-w-none prose-p:text-background-10 prose-headings:text-background-10 prose-a:text-background-20 prose-strong:text-background-10 prose-code:text-accent-background-10 prose-pre:text-background-10 prose-li:text-background-10 prose-th:text-background-10 prose-td:text-background-10 prose-blockquote:text-background-10 prose-slime" />;
};
