import { ParentProps } from "solid-js";

export function Container(props: ParentProps & { class?: string }) {
  return (
      <div class={`bg-background-70 border border-background-40 rounded-2xl p-4 ${props.class ? `${props.class}` : ""}`}>
        {props.children}
      </div>
  );
}
