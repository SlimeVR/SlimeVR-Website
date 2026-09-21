import clsx from "clsx";
import {
  Component,
  createMemo,
  JSX,
  mergeProps,
  ParentComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { AllUnionElements } from "../../utils/union";
import { Localized } from "@llelievr.dev/solid-fluent";

type Variants = "primary" | "secondary";

interface TypographyProps {
  variant?: "main-title" | "section-title" | "standard";
  bold?: boolean;
  italic?: boolean;
  truncate?: boolean;
  block?: boolean;
  color?: Variants | string;
  whitespace?:
    | "whitespace-normal"
    | "whitespace-nowrap"
    | "whitespace-pre"
    | "whitespace-pre-line"
    | "whitespace-pre-wrap";
  textAlign?:
    | "text-left"
    | "text-center"
    | "text-right"
    | "text-justify"
    | "text-start"
    | "text-end";
  tag: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  key?: string;
  children?: JSX.Element;
}

export const Typography: Component<TypographyProps> = (initialProps) => {
  const props = mergeProps(
    {
      variant: "standard",
      bold: false,
      color: "primary",
      whitespace: "whitespace-normal",
      italic: false,
      truncate: false,
    } satisfies Partial<TypographyProps>,
    initialProps
  );

  const classes = createMemo(() =>
    clsx([
      props.variant === "main-title" && "text-main-title",
      props.variant === "section-title" && "text-section-title",
      props.variant === "standard" &&
        (props.bold ? "text-standard-bold" : "text-standard"),
      props.color === "primary" && "text-background-10",
      props.color === "secondary" && "text-background-30",
      props.color &&
        !(
          ["primary", "secondary"] satisfies AllUnionElements<Variants>
        ).includes(props.color as Variants) &&
        props.color,
      props.whitespace,
      props.textAlign,
      props.italic && "italic",
      props.truncate && "leading-3 text-ellipsis line-clamp-2",
    ])
  );

  if (props.key) {
    return (
      <Localized id={props.key}>
        <Dynamic component={props.tag} class={classes()}>
          {props.children}
        </Dynamic>
      </Localized>
    );
  }

  return (
    <Dynamic component={props.tag} class={classes()}>
      {props.children}
    </Dynamic>
  );
};
