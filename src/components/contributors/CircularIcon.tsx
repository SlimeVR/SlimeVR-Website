import { JSX } from "solid-js";

type CircularIconProps = {
  size: number;
  children: JSX.Element;
  class?: string;
  element?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
};

export default function CircularIcon(props: CircularIconProps) {
  const BaseElement = props.element || "div";

  return (
    <BaseElement
      class={`bg-background-10 shadow-lg rounded-full flex items-center justify-center overflow-hidden ${props.class ? `${props.class}` : ""}`}
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
      href={props.href}
      target={props.target}
      rel={props.rel}
    >
      {props.children}
    </BaseElement>
  );
}
