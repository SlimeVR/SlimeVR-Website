import { SolidMarkdownComponents } from "solid-markdown";
import { resolveAssetPath } from "../../utils/blog.helper";
import { markdownLinkOverride } from "./MarkdownLinkOverride";
import { markdownImgOverride } from "./MarkdownImgOverride";

export const MarkdownBaseComponentOverrides = ({
  postId,
}: {
  postId: string;
}): SolidMarkdownComponents => ({
  a: markdownLinkOverride(),
  img: markdownImgOverride(postId),
  video: (props) => {
    const { src } = props;
    return <video {...props} src={resolveAssetPath(postId, src)} controls />;
  },
});

