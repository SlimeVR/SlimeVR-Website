import { SolidMarkdownComponents } from "solid-markdown";
import { resolveAssetPath } from "../../utils/blog.helper";

export function markdownImgOverride(
  postId: string
): SolidMarkdownComponents["img"] {
  return (props) => {
    const resolvedSrc =
      typeof props.src === "string"
        ? resolveAssetPath(postId, props.src)
        : props.src;

    if (resolvedSrc?.startsWith("/blog/emoji/")) {
      return (
        <img
          {...props}
          src={resolvedSrc}
          loading="lazy"
          style={{
            display: "inline-block",
            height: "1.2em",
            width: "1.2em",
            margin: "0 0.05em",
            "vertical-align": "-0.2em",
            "object-fit": "contain",
          }}
        />
      );
    }

    return (
      <img
        {...props}
        src={resolvedSrc}
        class="max-h-96 object-contain mx-auto"
        loading="lazy"
      />
    );
  };
}
