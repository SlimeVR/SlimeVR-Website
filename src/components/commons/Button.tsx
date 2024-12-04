import clsx from "clsx";
import {
  ComponentProps,
  createMemo,
  mergeProps,
  ParentComponent,
} from "solid-js";
import { A } from "@solidjs/router";

interface ButtonProps extends ComponentProps<"button"> {
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
  size?: "default" | "big";
  href?: string;
  loading?: boolean;
}

export const Button: ParentComponent<ButtonProps> = (initialProps) => {
  const props = mergeProps(
    {
      type: "button",
      size: "default",
      loading: false,
    } satisfies Partial<ButtonProps>,
    initialProps
  );

  const classes = createMemo(() => {
    const variantsMap = {
      primary: clsx({
        "bg-accent-background-30 hover:bg-accent-background-20 text-background-10":
          !props.disabled,
        "bg-accent-background-40 hover:bg-accent-background-40 cursor-not-allowed text-accent-background-10":
          props.disabled,
      }),
      secondary: clsx({
        "bg-background-60 hover:bg-background-50 text-background-10":
          !props.disabled,
        "bg-background-60 hover:bg-background-60 cursor-not-allowed text-background-40":
          props.disabled,
      }),
      tertiary: clsx({
        "bg-background-50 hover:bg-background-40 text-background-10":
          !props.disabled,
        "bg-background-50 hover:bg-background-50 cursor-not-allowed text-background-40":
          props.disabled,
      }),
      quaternary: clsx({
        "bg-background-70 hover:bg-background-60 text-background-10":
          !props.disabled,
        "bg-background-70 hover:bg-background-70 cursor-not-allowed text-background-40":
          props.disabled,
      }),
    };

    return clsx(
      variantsMap[props.variant],
      "focus:ring-4 text-center relative flex items-center justify-center",
      {
        "rounded-md px-5 py-2.5 text-standard": props.size === "default",
        "rounded-2xl px-12 py-8 text-4xl font-bold": props.size === "big",
      },
      props.class
    );
  });

  if (props.href) {
    return (
      <A href={props.href} class={classes()}>
        {props.children}
      </A>
    );
  }
  return (
    <button {...props} class={classes()}>
      {props.children}
    </button>
  );
};
