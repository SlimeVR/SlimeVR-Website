import { JSX, ParentComponent, Show } from "solid-js";
import { ArrowIcon } from "./icons/ArrowIcon";

interface ArrowButtonProps {
  prefixIcon?: JSX.Element;
}

export const ArrowButton: ParentComponent<ArrowButtonProps> = (props) => {
  return (
    <div class="flex items-center gap-5 bg-background-60 rounded-2xl p-2 pl-5 pr-10 hover:cursor-pointer group hover:bg-background-50 opacity-95 transition-colors border border-background-30">
      <Show when={props.prefixIcon}>
        <div class="flex w-12 justify-center fill-white group-hover:fill-accent-background-10">
          {props.prefixIcon}
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
    </div>
  );
};
