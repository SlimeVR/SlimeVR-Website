import { toString } from "hast-util-to-string";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeSlug);

export interface BlogHeading {
  readonly id: string;
  readonly level: number;
  readonly text: string;
}

export function extractBlogHeadings(markdownString: string): BlogHeading[] {
  if (!markdownString)
    throw new Error("Error: No content was given to heading extraction");

  const tree = processor.parse(markdownString);
  const hastTree = processor.runSync(tree);

  const headings: BlogHeading[] = [];

  visit(hastTree, "element", (node) => {
    if (!/^h[1-3]$/.test(node.tagName)) return;

    const text = toString(node).trim();
    const id = typeof node.properties.id === "string" ? node.properties.id : "";

    if (text && id) {
      headings.push({ level: Number(node.tagName.replace("h", "")), text, id });
    }
  });

  return headings;
}
