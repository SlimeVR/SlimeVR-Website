import { SolidMarkdownComponents } from "solid-markdown";
import { resolveAssetPath } from "../../utils/blog.helper";
import { LazyLoadImage } from "~/components/commons";

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
      <LazyLoadImage
        {...props}
        src={resolvedSrc}
        containerClasses="grid-cols-1 justify-items center"
        skeletonClasses="h-96 my-2 mx-auto w-full rounded-xl"
        imageClasses="max-h-96 object-contain mx-auto"
      />
    );
  };
}
