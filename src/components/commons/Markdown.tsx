import { ComponentProps } from "solid-js";

export const MarkdownLink = (props: ComponentProps<"a">) => (
  <a target="_blank" href={props.href} class="link text-background-20">
    {props.children}
  </a>
);
