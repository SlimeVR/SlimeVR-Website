import { SolidMarkdownComponents } from "solid-markdown";
import getVideoId from "get-video-id";

import "../emoji.css";
import { resolveAssetPath } from "../utils/blog.helper";
import { children } from "solid-js";
import { noop } from "@tanstack/solid-query";

function getYoutubeVideoId(videoUrl: string | undefined): string | null {
  if (videoUrl === undefined) return null;

  const videoMetadata = getVideoId(videoUrl);

  return videoMetadata.service === "youtube" && videoMetadata.id
    ? videoMetadata.id
    : null;
}

const YoutubeEmbed = (props: { url: string }) => (
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
  a: ({ node, href, children, ...props }) => {
    const ytVideoId = getYoutubeVideoId(href);

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  img: (props) => {
    const { node, src, ...imgProps } = props;
    const resolvedSrc =
      typeof src === "string" ? resolveAssetPath(postId, src) : src;
    const isPlainUrl =
      node?.children?.length === 1 &&
      node?.children[0].type === "text" &&
      node?.children[0].value === src;

    if (isPlainUrl && resolvedSrc) return <YoutubeEmbed url={src} />;

    return <img {...props} src={resolvedSrc} loading="lazy" />;
  },
  video: (props) => {
    const { src } = props;
    return <video {...props} src={resolveAssetPath(postId, src)} controls />;
  },
});
