import getVideoId from "get-video-id";
import { Element } from "hast";
import { SolidMarkdownComponents } from "solid-markdown";

export function markdownLinkOverride(): SolidMarkdownComponents["a"] {
  return ({ node, href, children, ...props }) => {
    const ytVideoId = getYoutubeVideoId(href);

    const hasLabel = isHasLabel(node, href);

    if (hasLabel && ytVideoId) return <YoutubeEmbed videoId={ytVideoId} />;

    return (
      <a href={href} class={hasLabel ? "break-all" : "block max-w-full truncate"} {...props}>
        {children}
      </a>
    );
  };
}

function isHasLabel(node: Element, href: string | undefined) {
  return node?.children?.length === 1 &&
    node?.children[0].type === "text" &&
    node?.children[0].value === href;
}

function getYoutubeVideoId(videoUrl: string | undefined): string | null {
  if (videoUrl === undefined) return null;

  const videoMetadata = getVideoId(videoUrl);

  return videoMetadata.service === "youtube" && videoMetadata.id
    ? videoMetadata.id
    : null;
}

const YoutubeEmbed = (props: { videoId: string }) => (
  <div class="aspect-video">
    <iframe
      src={`https://www.youtube.com/embed/${props.videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="w-full h-full"
    />
  </div>
);
