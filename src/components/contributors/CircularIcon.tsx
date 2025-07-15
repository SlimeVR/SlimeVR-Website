import { JSX } from "solid-js";

type CircularIconProps = {
  size: number;
  children: JSX.Element;
  class?: string;
};

export default function CircularIcon(props: CircularIconProps) {
  return (
    <div
      class={`bg-background-10 shadow-lg rounded-full flex items-center justify-center overflow-hidden ${props.class ? `${props.class}` : ""}`}
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    >
      {props.children}
    </div>
  );
}
