import { Component, mergeProps } from "solid-js";

export const SlimeVRIcon: Component<IconProps> = (initialProps) => {
  const props = mergeProps(
    {
      size: 28,
    } satisfies Partial<IconProps>,
    initialProps
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      stroke-miterlimit="10"
      clip-rule="evenodd"
      width={props.size}
      class={props.class}
      viewBox="0 0 380 380"
    >
      <g fill="none">
        <path stroke-width="13.62" d="M72.867 191.74l37-39 39 36"></path>
        <path stroke-width="13.62" d="M208.87 187.74l38-35 36 38"></path>
        <path
          stroke-linecap="square"
          stroke-width="17"
          d="M56.867 253.74s130.61-31.182 248 5c13.45 4.146 20.244 2.975 20-8s1.909-126.06-46-131"
        ></path>
      </g>
    </svg>
  );
};
