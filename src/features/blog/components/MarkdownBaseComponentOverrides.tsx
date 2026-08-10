import { SolidMarkdownComponents } from "solid-markdown";
import "../emoji.css";

export const MarkdownBaseComponentOverrides: SolidMarkdownComponents = {
  img: (props) => <img {...props} loading="lazy" />,
};
