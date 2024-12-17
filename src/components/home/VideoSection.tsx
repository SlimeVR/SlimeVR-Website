import {
  batch,
  Component,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
} from "solid-js";
import { Typography } from "../commons/Typography";
import { PlayIcon } from "../../components/commons/icons/PlayIcon";
import { ArrowIcon } from "../../components/commons/icons/ArrowIcon";
import clsx from "clsx";
import { getContentSize } from "../../utils/dom";
import { isServer } from "solid-js/web";

const videos = [
  {
    src: "https://www.youtube.com/embed/0fQlpzWBbXk?si=q_As-iKh4Lv_8l6P",
    thumbnail: "https://i.ytimg.com/vi/0fQlpzWBbXk/hqdefault.jpg",
  },
  {
    src: "https://www.youtube.com/embed/s2zRppG0izI",
    thumbnail: "https://i.ytimg.com/vi/s2zRppG0izI/hqdefault.jpg",
  },
  {
    src: "https://www.youtube.com/embed/CzZhXpOiFh0?si=K7TJleoDlhsTxnR9",
    thumbnail: "https://i.ytimg.com/vi/CzZhXpOiFh0/hqdefault.jpg",
  },
  {
    src: "https://www.youtube.com/embed/2sIk4kmNwTQ?si=2tnHYa4oWbzAkvWA",
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
        "rounded-lg overflow-clip aspect-video h-[90px] sm:h-[126px] relative border-2",
        props.active ? "border-accent-background-10" : "border-transparent"
      )}
      onClick={props.onClick}
    >
      <div
        class={clsx(
          "absolute top-0 h-full w-full bg-background-80 transition-opacity"
        )}
      >
        <div class={clsx("h-full w-full bg-background-50 animate-pulse")}></div>
      </div>
      <img
        src={props.thumbnail}
        class="w-full h-full object-cover absolute top-0"
        loading="lazy"
      ></img>

      <div
        class={clsx(
          "w-full h-full top-0 absolute bg-accent-background-10",
          props.active ? " opacity-50" : "opacity-0"
        )}
      ></div>
      <div class="absolute top-0 h-full w-full flex justify-center items-center">
        <div class="bg-accent-background-10 w-12 h-12 rounded-full p-3 flex justify-center">
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
  const [autoplay, setAutoplay] = createSignal(false);
  const [videosContainerSize, setVideosContainerSize] =
    createSignal<DOMRect>(null);
  const [videosScrollSize, setVideosScrollSize] = createSignal<DOMRect>(null);
  const [videosScroll, setVideosScroll] = createSignal<number>(0);
  let videosContainerRef: HTMLDivElement;
  let videosScrollRef: HTMLDivElement;
  let resizeObserver;

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

  const openVideo = (video) => {
    batch(() => {
      setAutoplay(true);
      setCurrentVideo(video);
    });
  };

  return (
    <div class="flex flex-col gap-4 relative">
      <Typography
        tag="h2"
        variant="main-title"
        textAlign="text-center"
        key="home.video-section"
      />
      <div class="flex">
        <div class="flex flex-grow flex-col gap-2 sm:gap-4 w-full">
          <div class="flex gap-4 flex-col justify-center">
            <div class="w-full flex aspect-video bg-background-60 rounded-lg  md:rounded-3xl p-2 md:p-4  border border-background-40">
              <iframe
                width="100%"
                class="rounded-lg"
                src={
                  currentVideo().src + `?&autoplay=${autoplay() ? "1" : "0"}`
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div class="flex gap-2 md:gap-4 justify-center items-center">
              <VideoControl
                onClick={() => scrollPrev()}
                active={shouldShowPrev()}
              ></VideoControl>
              <div
                class="flex overflow-x-auto no-scrollbar scroll-smooth bg-background-60 rounded-lg  md:rounded-3xl p-2 md:p-4 border border-background-40"
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
