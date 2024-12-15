import {
  children,
  Component,
  JSX,
  mergeProps,
  ParentComponent,
  Show,
  splitProps,
} from "solid-js";
import { ArrowIcon } from "./icons/ArrowIcon";
import clsx from "clsx";
import { A, AnchorProps } from "@solidjs/router";

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

  return (
    <A
      {...anchorProps}
      class={clsx(
        "flex items-center sm:gap-5 gap-2 bg-background-60 rounded-2xl p-3 sm:pl-5 sm:pr-10 px-5 hover:cursor-pointer group hover:bg-background-50 opacity-95 transition-colors border",
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
      <div class="flex flex-col flex-grow">{props.children}</div>
      <div class="flex w-9 group-hover:translate-x-5 transition-transform duration-200">
        <ArrowIcon
          class="fill-background-10"
          size={30}
          direction="right"
        ></ArrowIcon>
      </div>
    </A>
  );
};
