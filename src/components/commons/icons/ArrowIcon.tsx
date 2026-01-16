import clsx from "clsx";
import { Component, createMemo, mergeProps } from "solid-js";

interface ArrowIconProps extends IconProps {
  direction: "up" | "down" | "left" | "right";
  type?: "arrow" | "cheveron";
}

export const ArrowIcon: Component<ArrowIconProps> = (initialProps) => {
  const props = mergeProps(
    {
      type: "arrow",
    } satisfies Partial<ArrowIconProps>,
    initialProps
  );

  const rotations = createMemo(() => {
    const rotationMap = {
      up: "-90deg",
      left: "-180deg",
      right: "0deg",
      down: "90deg",
    };
    return rotationMap[props.direction];
  });

  return props.type == "arrow" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={props.size}
      class={clsx(props.class, "transition-[rotation] duration-200")}
      style={{
        rotate: rotations(),
      }}
    >
      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={props.size}
      class={clsx(props.class, "transition-[rotation]")}
      style={{
        rotate: rotations(),
      }}
    >
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
};
