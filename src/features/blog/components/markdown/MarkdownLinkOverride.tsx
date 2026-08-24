import getVideoId from "get-video-id";
import { SolidMarkdownComponents } from "solid-markdown";

export function markdownLinkOverride(): SolidMarkdownComponents["a"] {
  return ({ node, href, children, ...props }) => {
    const ytVideoId = getYoutubeVideoId(href);

    const isPlainUrl =
      node?.children?.length === 1 &&
      node?.children[0].type === "text" &&
      node?.children[0].value === href;

    if (isPlainUrl && ytVideoId) return <YoutubeEmbed videoId={ytVideoId} />;

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
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
