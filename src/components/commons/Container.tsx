import { ParentProps } from "solid-js";

export function Container(props: ParentProps & { className?: string }) {
  return (
      <div class={`bg-background-70 border border-background-40 rounded-2xl p-4 ${props.className ? `${props.className}` : ""}`}>
        {props.children}
      </div>
  );
}
