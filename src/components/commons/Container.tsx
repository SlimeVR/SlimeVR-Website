import { ParentProps } from "solid-js";

export function Container(
  props: ParentProps & { class?: string; id?: string }
) {
  return (
    <div
      class={`bg-background-70 border-background-40 rounded-2xl border p-4 ${props.class ? `${props.class}` : ""}`}
      id={props.id}
    >
      {props.children}
    </div>
  );
}
