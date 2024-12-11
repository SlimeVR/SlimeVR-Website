import clsx from "clsx";
import { ParentComponent, Show } from "solid-js";

interface SectionProps {
  gizmo?: string;
}

export const Section: ParentComponent<SectionProps> = (props) => {
  return (
    <div class="w-full relative flex justify-center">
      <Show when={props.gizmo}>
        {(gizmo) => (
          <div class="flex absolute top-0 h-fit justify-center w-full overflow-x-clip select-none pointer-events-none">
            <img
              class={clsx(
                "w-full object-contain scale-[110%]",
                "rotate-[12deg]"
              )}
              src={gizmo()}
            ></img>
          </div>
        )}
      </Show>
      <div class="max-w-6xl 2xl:max-w-[1400px] w-full z-10 px-4">
        {props.children}
      </div>
    </div>
  );
};
