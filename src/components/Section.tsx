import clsx from "clsx";
import { ParentComponent, Show } from "solid-js";

interface SectionProps {
  gizmo?: string;
  rotate?: "rotate-12" | "-rotate-12";
}

export const Section: ParentComponent<SectionProps> = (props) => {
  return (
    <div class="w-full relative flex justify-center">
      <Show when={props.gizmo}>
        {(gizmo) => (
          <div class="flex absolute top-0 h-full justify-center w-full overflow-x-clip">
            <img
              class={clsx("w-full object-contain scale-125", "rotate-12")}
              src={gizmo()}
            ></img>
          </div>
        )}
      </Show>
      <div class="max-w-6xl w-full z-10 px-4">{props.children}</div>
    </div>
  );
};
