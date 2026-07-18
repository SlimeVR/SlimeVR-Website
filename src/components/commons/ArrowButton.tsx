import { A, AnchorProps } from "@solidjs/router";
import clsx from "clsx";
import {
  children,
  JSX,
  mergeProps,
  ParentComponent,
  Show,
  splitProps,
} from "solid-js";
import { ArrowIcon } from "./icons/ArrowIcon";
import { createSignal, onMount, onCleanup } from "solid-js";
import { getContentSize } from "~/utils/dom";
interface ArrowButtonProps extends AnchorProps {
  prefixIcon?: JSX.Element;
  variant?: "primary" | "default";
}

export const ArrowButton: ParentComponent<ArrowButtonProps> = (
  initialProps
) => {
  const allProps = mergeProps(
    {
      variant: "default",
    } satisfies Partial<ArrowButtonProps>,
    initialProps
  );
  const [props, anchorProps] = splitProps(allProps, [
    "prefixIcon",
    "variant",
    "children",
  ]);

  const prefixIcon = children(() => props.prefixIcon);
  const [showArrow, setShowArrow] = createSignal(true);

  let containerRef!: HTMLAnchorElement;
  let arrowRef!: HTMLDivElement;
  let rafId: number;

  const checkOverflow = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (!containerRef || !arrowRef) return;
      const container = getContentSize(containerRef);
      const arrow = getContentSize(arrowRef);
      const margin = 21;
      setShowArrow(
        Math.round(arrow.right) <= Math.round(container.right) - margin
      );
    });
  };

  onMount(() => {
    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(containerRef);

    onCleanup(() => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", checkOverflow);
      observer.disconnect();
    });
  });

  return (
    <A
      {...anchorProps}
      ref={containerRef}
      class={clsx(
        "flex items-center sm:gap-5 gap-2 bg-background-60/80 rounded-2xl p-3 sm:pl-5 sm:pr-10 px-5 hover:cursor-pointer group hover:bg-background-50 backdrop-blur-[9px] transition-colors border",
        props.variant === "primary"
          ? "border-status-success"
          : "border-background-30"
      )}
    >
      <Show when={prefixIcon()}>
        <div
          class={clsx(
            "w-12 justify-center group-hover:fill-status-success fill-white hidden sm:flex"
          )}
        >
          {prefixIcon()}
        </div>
      </Show>
      <div class={clsx("flex flex-col grow min-w-0", !showArrow() && "items-center")}>
        {props.children}
      </div>

      <div
        ref={arrowRef}
        class={clsx(
          "flex w-9 group-hover:translate-x-5 transition-transform duration-200",
          !showArrow() && "invisible"
        )}
      >
        <ArrowIcon class="fill-background-10" size={30} direction="right" />
      </div>
    </A>
  );
};
