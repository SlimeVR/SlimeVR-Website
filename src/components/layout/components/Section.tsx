import clsx from "clsx";
import { ParentComponent, Show } from "solid-js";

interface SectionProps {
  gizmo?: string;
}

export const Section: ParentComponent<SectionProps> = (props) => {
  return (
    <div class="relative flex w-full justify-center">
      <Show when={props.gizmo}>
        {(gizmo) => (
          <div class="no-interact absolute top-0 flex h-fit w-full justify-center overflow-x-clip">
            <img
              class={clsx("w-full scale-[110%] object-contain", "rotate-12")}
              src={gizmo()}
              alt=""
            ></img>
          </div>
        )}
      </Show>
      <div class="z-10 w-full max-w-6xl px-4 2xl:max-w-350">
        {props.children}
      </div>
    </div>
  );
};
