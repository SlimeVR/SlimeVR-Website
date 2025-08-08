import { JSX, Match, Switch } from "solid-js";

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
  const BaseElement = props.element ?? "div";

  const class_ = `bg-background-10 shadow-lg rounded-full flex items-center justify-center overflow-hidden ${props.class ?? ""}`;
  const style = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };

  return (
    <Switch>
      <Match when={BaseElement === "a"}>
        <a
          class={class_}
          style={style}
          href={props.href}
          target={props.target}
          rel={props.rel}
        >
          {props.children}
        </a>
      </Match>
      <Match when={BaseElement === "div"}>
        <div class={class_} style={style}>
          {props.children}
        </div>
      </Match>
    </Switch>
  );
}
