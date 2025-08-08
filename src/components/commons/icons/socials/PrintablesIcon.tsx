import { Component } from "solid-js";

export const PrintablesIcon: Component<IconProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      class={props.class}
      viewBox="0 0 25 35"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path d="m0 35 12.172-7L0 21ZM12.172 0 0 7l12.172 7v14l12.172-7V7Z"></path>
    </svg>
  );
};
