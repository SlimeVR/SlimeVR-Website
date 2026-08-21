import { SolidMarkdownComponents } from "solid-markdown";

import "../emoji.css";
import { resolveAssetPath } from "../utils/blog.helper";

const YoutubeEmbed = (props: { postId: string; url: string }) => (
  <div class="aspect-video">
    <iframe
      src={props.url}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
);

export const MarkdownBaseComponentOverrides = ({
  postId,
}: {
  postId: string;
}): SolidMarkdownComponents => ({
  img: (props) => {
    const { node, src, ...imgProps } = props;
    const resolvedSrc =
      typeof src === "string" ? resolveAssetPath(postId, src) : src;

    return <img {...props} src={resolvedSrc} loading="lazy" />;
  },
  video: (props) => {
    if (
      props.src !== undefined &&
      props.src.startsWith("https://www.youtube.com/")
    ) {
      return <YoutubeEmbed postId={postId} url={props.src} />;
    }

    const { node, src, ...videoProps } = props;
    const resolvedSrc = typeof src === "string" ? resolveAssetPath(postId, src) : src;
    return <video {...videoProps} src={resolvedSrc} controls />;
  },
});
