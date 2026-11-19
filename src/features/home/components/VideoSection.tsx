import clsx from "clsx";
import {
  batch,
  Component,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
} from "solid-js";
import { isServer } from "solid-js/web";
import { ArrowIcon } from "../../../components/commons/icons/ArrowIcon";
import { PlayIcon } from "../../../components/commons/icons/PlayIcon";
import { getContentSize } from "../../../utils/dom";
import { Typography } from "../../../components/commons";

interface Video {
  src: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    src: "https://www.youtube-nocookie.com/embed/2JqAj1_KYXU",
    thumbnail: "https://i.ytimg.com/vi/2JqAj1_KYXU/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/0fQlpzWBbXk",
    thumbnail: "https://i.ytimg.com/vi/0fQlpzWBbXk/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/vBZreCeOmio",
    thumbnail: "https://i.ytimg.com/vi/vBZreCeOmio/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/RC6hxWJvv9Q",
    thumbnail: "https://i.ytimg.com/vi/RC6hxWJvv9Q/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/JHSXlTkXKbc",
    thumbnail: "https://i.ytimg.com/vi/JHSXlTkXKbc/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/0NMxdY1G0kY",
    thumbnail: "https://i.ytimg.com/vi/0NMxdY1G0kY/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/_a124Y8y9UM",
    thumbnail: "https://i.ytimg.com/vi/_a124Y8y9UM/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/Pbm2pK8iEAA",
    thumbnail: "https://i.ytimg.com/vi/Pbm2pK8iEAA/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/G0du9c7doqs",
    thumbnail: "https://i.ytimg.com/vi/G0du9c7doqs/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/s2zRppG0izI",
    thumbnail: "https://i.ytimg.com/vi/s2zRppG0izI/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/CzZhXpOiFh0",
    thumbnail: "https://i.ytimg.com/vi/CzZhXpOiFh0/hqdefault.jpg",
  },
  {
    src: "https://www.youtube-nocookie.com/embed/2sIk4kmNwTQ",
    thumbnail: "https://i.ytimg.com/vi/2sIk4kmNwTQ/hqdefault.jpg",
  },
];

const VideoThumbnail: Component<{
  thumbnail: string;
  active: boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      class={clsx(
        "group relative aspect-video h-22.5 cursor-pointer overflow-clip rounded-lg border-2 sm:h-31.5",
        props.active ? "border-accent-background-10" : "border-transparent"
      )}
      onClick={props.onClick}
      aria-label="Play video"
    >
      <div
        class={clsx(
          "bg-background-80 absolute top-0 h-full w-full transition-opacity"
        )}
      >
        <div class={clsx("bg-background-50 h-full w-full animate-pulse")}></div>
      </div>
      <img
        src={props.thumbnail}
        class="absolute top-0 h-full w-full object-cover"
        loading="lazy"
        alt="Video thumbnail"
      ></img>

      <div
        class={clsx(
          "bg-accent-background-10 absolute top-0 h-full w-full",
          props.active ? "opacity-50" : "opacity-0"
        )}
      ></div>
      <div class="absolute top-0 flex h-full w-full items-center justify-center">
        <div class="bg-accent-background-10 group-hover:bg-accent-background-30 flex h-12 w-12 justify-center rounded-full p-3 transition-colors">
          <PlayIcon size={20} class="fill-background-10"></PlayIcon>
        </div>
      </div>
    </button>
  );
};

const VideoControl: Component<{
  next?: boolean;
  onClick: () => void;
  active: boolean;
}> = (props) => {
  return (
    <div class={clsx("flex h-full items-center justify-center")}>
      <button
        class={clsx(
          "bg-accent-background-10 flex h-8 w-8 items-center justify-center rounded-full p-3 transition-colors hover:cursor-pointer md:h-12 md:w-12",
          props.active
            ? "bg-accent-background-10 hover:bg-accent-background-30"
            : "bg-background-80"
        )}
        disabled={!props.active}
        onClick={props.onClick}
        aria-label={props.next ? "Next video" : "Previous video"}
      >
        <ArrowIcon
          direction={props.next ? "right" : "left"}
          type="cheveron"
          class={props.active ? "fill-background-10" : "fill-background-60"}
          size={16}
        ></ArrowIcon>
      </button>
    </div>
  );
};

export const VideoSection: Component = () => {
  const [currentVideo, setCurrentVideo] = createSignal(videos[0]);
  const [autoplay, setAutoplay] = createSignal(false);
  const [videosContainerSize, setVideosContainerSize] = createSignal<DOMRect>();
  const [videosScrollSize, setVideosScrollSize] = createSignal<DOMRect>();
  const [videosScroll, setVideosScroll] = createSignal<number>(0);
  let videosContainerRef!: HTMLDivElement;
  let videosScrollRef!: HTMLDivElement;
  let resizeObserver: ResizeObserver;

  const shouldShowNext = createMemo(() => {
    const containerSize = videosContainerSize();
    const scrollSize = videosScrollSize();
    if (!containerSize || !scrollSize) return false;
    return (
      scrollSize.width < containerSize.width &&
      videosScroll() + scrollSize.width < videosScrollRef.scrollWidth
    );
  });

  const shouldShowPrev = createMemo(() => {
    const containerSize = videosContainerSize();
    const scrollSize = videosScrollSize();
    if (!containerSize || !scrollSize) return false;
    return scrollSize.width < containerSize.width && videosScroll() > 0;
  });

  const scrollNext = () => {
    videosScrollRef.scrollBy({
      left: videosContainerSize()!.width / videos.length,
    });
  };

  const scrollPrev = () => {
    videosScrollRef.scrollBy({
      left: -videosContainerSize()!.width / videos.length,
    });
  };

  const onResize = () => {
    batch(() => {
      setVideosContainerSize(getContentSize(videosContainerRef));
      setVideosScrollSize(getContentSize(videosScrollRef));
      setVideosScroll(videosScrollRef.scrollLeft);
    });
  };

  const onScrollEnd = () => {
    setVideosScroll(videosScrollRef.scrollLeft);
  };

  onMount(() => {
    if (!isServer) {
      resizeObserver = new ResizeObserver(() => onResize());
      videosScrollRef.addEventListener("scrollend", onScrollEnd);
      resizeObserver.observe(videosScrollRef);
      onResize();
    }
  });

  onCleanup(() => {
    if (!isServer) {
      videosScrollRef.removeEventListener("scrollend", onScrollEnd);
      if (resizeObserver) resizeObserver.unobserve(videosScrollRef);
    }
  });

  const openVideo = (video: Video) => {
    batch(() => {
      setAutoplay(true);
      setCurrentVideo(video);
    });
  };

  return (
    <div class="relative flex flex-col gap-4">
      <Typography
        tag="h2"
        variant="main-title"
        textAlign="text-center"
        key="home.video-section"
      />
      <div class="flex">
        <div class="flex w-full grow flex-col gap-2 sm:gap-4">
          <div class="flex flex-col justify-center gap-4">
            <div class="bg-background-60 border-background-40 group flex aspect-video w-full rounded-lg border p-2 md:rounded-3xl md:p-4">
              {autoplay() ? (
                <iframe
                  title="YouTube video player"
                  width="100%"
                  class="rounded-lg"
                  src={currentVideo().src + `?&autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              ) : (
                <button
                  class="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg"
                  aria-label="Play video"
                  onClick={() => setAutoplay(true)}
                >
                  <img
                    src={currentVideo().thumbnail.replace(
                      "hqdefault",
                      "maxresdefault"
                    )}
                    class="absolute top-0 h-full w-full object-cover"
                    loading="lazy"
                    alt="Video thumbnail"
                  ></img>
                  <div class="relative z-10 border-0 bg-transparent p-0">
                    <div class="bg-accent-background-10 group-hover:bg-accent-background-30 flex h-16 w-16 justify-center rounded-full p-3 transition-colors">
                      <PlayIcon size={26} class="fill-background-10"></PlayIcon>
                    </div>
                  </div>
                </button>
              )}
            </div>
            <div class="flex items-center justify-center gap-2 md:gap-4">
              <VideoControl
                onClick={() => scrollPrev()}
                active={shouldShowPrev()}
              ></VideoControl>
              <div
                class="no-scrollbar bg-background-60 border-background-40 flex overflow-x-auto scroll-smooth rounded-lg border p-2 md:rounded-3xl md:p-4"
                ref={videosScrollRef}
              >
                <div class="flex gap-2 md:gap-4" ref={videosContainerRef}>
                  <For each={videos}>
                    {(video) => (
                      <VideoThumbnail
                        active={currentVideo().src === video.src}
                        thumbnail={video.thumbnail}
                        onClick={() => openVideo(video)}
                      ></VideoThumbnail>
                    )}
                  </For>
                </div>
              </div>
              <VideoControl
                next
                onClick={() => scrollNext()}
                active={shouldShowNext()}
              ></VideoControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
