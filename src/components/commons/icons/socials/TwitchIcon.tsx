import { Component } from "solid-js";

export const TwitchIcon: Component<IconProps> = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      class={props.class}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.91418 0.196045L2.04102 3.06921V13.4126H5.48881V16.2858L8.36198 13.4126H10.6605L15.8322 8.2409V0.196045H4.91418ZM14.6829 7.66627L12.3844 9.9648H10.0859L8.07466 11.976V9.9648H5.48881V1.34531H14.6829V7.66627Z"
        fill="#081E30"
      />
      <path
        d="M12.9588 3.35657H11.8096V6.80436H12.9588V3.35657Z"
        fill="#081E30"
      />
      <path
        d="M9.79868 3.35657H8.64941V6.80436H9.79868V3.35657Z"
        fill="#081E30"
      />
    </svg>
  );
};
