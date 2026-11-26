import {
  batch,
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { Typography } from "../../components/commons/Typogrtaphy";
import { Video } from "../../components/commons/Video";
import { PlayIcon } from "../../components/commons/icons/PlayIcon";
import { ArrowIcon } from "../../components/commons/icons/ArrowIcon";
import clsx from "clsx";
import { getContentSize } from "../../utils/dom";

const videos = [
  {
    src: "/videos/thrill.mp4",
    thumbnail: "/images/thumbnails/thrill.webp",
    descriptionKey: "video-thrill-description",
  },
  {
    src: "/videos/zrock.mp4",
    thumbnail: "/images/thumbnails/zrock.webp",
    descriptionKey: "video-zrock-description",
  },
  {
    src: "/videos/themysticle.mp4",
    thumbnail: "/images/thumbnails/themysticle.webp",
    descriptionKey: "video-themysticle-description",
  },
  {
    src: "/videos/themysticle.mp4",
    thumbnail: "/images/thumbnails/themysticle.webp",
    descriptionKey: "video-themysticle-description",
  },
  {
    src: "/videos/themysticle.mp4",
    thumbnail: "/images/thumbnails/themysticle.webp",
    descriptionKey: "video-themysticle-description",
  },
  {
    src: "/videos/themysticle.mp4",
    thumbnail: "/images/thumbnails/themysticle.webp",
    descriptionKey: "video-themysticle-description",
  },
  {
    src: "/videos/themysticle.mp4",
    thumbnail: "/images/thumbnails/themysticle.webp",
    descriptionKey: "video-themysticle-description",
  },
  {
    src: "/videos/themysticle.mp4",
    thumbnail: "/images/thumbnails/themysticle.webp",
    descriptionKey: "video-themysticle-description",
  },
];

const VideoThumbnail: Component<{
  thumbnail: string;
  active: boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      class="bg-black rounded-lg aspect-video h-[90px] sm:h-[126px] flex justify-center items-center"
      onClick={props.onClick}
    >
      <div class="bg-accent-background-10 w-12 h-12 rounded-full p-3 flex justify-center">
        <PlayIcon size={20} class="fill-background-10"></PlayIcon>
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
    <div class={clsx("flex h-full justify-center items-center")}>
      <button
        class={clsx(
          "bg-accent-background-10 md:w-12 md:h-12 h-8 w-8 rounded-full p-3 flex justify-center items-center transition-colors",
          props.active
            ? "bg-accent-background-10 hover:bg-accent-background-30"
            : "bg-background-80"
        )}
        disabled={!props.active}
        onClick={props.onClick}
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
  const [videosContainerSize, setVideosContainerSize] =
    createSignal<DOMRect>(null);
  const [videosScrollSize, setVideosScrollSize] = createSignal<DOMRect>(null);
  const [videosScroll, setVideosScroll] = createSignal<number>(0);
  let videosContainerRef: HTMLDivElement;
  let videosScrollRef: HTMLDivElement;
  let resizeObserver = new ResizeObserver(() => onResize());

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
      left: videosContainerSize().width / videos.length,
    });
  };

  const scrollPrev = () => {
    videosScrollRef.scrollBy({
      left: -videosContainerSize().width / videos.length,
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
    console;
    setVideosScroll(videosScrollRef.scrollLeft);
  };

  onMount(() => {
    videosScrollRef.addEventListener("scrollend", onScrollEnd);
    resizeObserver.observe(videosScrollRef);
    onResize();
  });

  onCleanup(() => {
    videosScrollRef.addEventListener("scrollend", onScrollEnd);
    resizeObserver.observe(videosScrollRef);
  });

  return (
    <div class="flex flex-col gap-4 relative">
      <Typography tag="h3" variant="main-title" textAlign="text-center">
        Reviews and Demos
      </Typography>
      <div class="flex">
        <div class="flex flex-grow flex-col gap-2 sm:gap-4 w-full">
          <div class="flex gap-4 flex-col justify-center bg-background-60 rounded-lg md:rounded-3xl p-2 md:p-4 border border-background-40">
            <div class="w-full flex aspect-video">
              <Video src={currentVideo().src}></Video>
            </div>
            <div class="flex gap-2 md:gap-4 justify-center items-center">
              <VideoControl
                onClick={() => scrollPrev()}
                active={shouldShowPrev()}
              ></VideoControl>
              <div
                class="flex overflow-x-auto no-scrollbar scroll-smooth"
                ref={videosScrollRef}
              >
                <div class="flex gap-2 md:gap-4" ref={videosContainerRef}>
                  <For each={videos}>
                    {(video) => (
                      <VideoThumbnail
                        active={currentVideo().src === video.src}
                        thumbnail={video.thumbnail}
                        onClick={() => {
                          setCurrentVideo(video);
                        }}
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
          <div class="flex p-4 bg-background-60 rounded-lg border border-background-40">
            <Typography tag="p" key={currentVideo().descriptionKey}>
              {currentVideo().descriptionKey}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
