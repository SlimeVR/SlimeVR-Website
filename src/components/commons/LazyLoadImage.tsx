import clsx from "clsx";
import {
  Component,
  createSignal,
  onCleanup,
  onMount,
  Show,
  splitProps,
} from "solid-js";
import type { JSX } from "solid-js";

export interface LazyLoadImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  containerClasses?: string;
  imageClasses?: string;
  skeletonClasses?: string;
}

export const LazyLoadImage: Component<LazyLoadImageProps> = (
  props
) => {
  const [local, others] = splitProps(props, [
    "containerClasses",
    "imageClasses",
    "skeletonClasses",
    "ref",
  ]);

  const [isLoaded, setIsLoaded] = createSignal(false);
  const [isFailed, setIsFailed] = createSignal(false);

  let imageRef: HTMLImageElement | undefined;

  onMount(() => {
    const image = imageRef;
    if (!image) return;

    const markLoaded = () => {
      setIsLoaded(true);
      setIsFailed(false);
    };

    const markLoadingError = () => {
      setIsLoaded(false);
      setIsFailed(true);
    };

    image.addEventListener("load", markLoaded);
    image.addEventListener("error", markLoadingError);

    onCleanup(() => {
      image.removeEventListener("load", markLoaded);
      image.removeEventListener("error", markLoadingError);
    });

    if (image.complete) {
      if (image.naturalWidth > 0) markLoaded();
      else markLoadingError();
    }
  });

  const isShowSkeleton = () => !isLoaded() && !isFailed();
  const isHideImage = () => isShowSkeleton() || isFailed();

  return (
    <div class={clsx("grid overflow-hidden", local.containerClasses)}>
      <Show when={isShowSkeleton()}>
        <div
          aria-hidden="true"
          class={clsx(
            local.skeletonClasses,
            "col-start-1 row-start-1 animate-pulse bg-background-50"
          )}
        />
      </Show>

      <Show when={isFailed()}>
        <div
          data-testid="image-failure"
          class={clsx(
            "col-start-1 row-start-1 flex items-center justify-center"
          )}
        >
          Failed To Load Image
        </div>
      </Show>
      <img
        {...others}
        ref={(elementRef) => {
          imageRef = elementRef;
          const forwardedRef = local.ref;
          if (typeof forwardedRef === "function") forwardedRef(imageRef);
        }}
        class={clsx(
          local.imageClasses,
          "col-start-1 row-start-1",
          isHideImage() ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
      />
    </div>
  );
};
