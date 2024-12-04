import { Component, ParentComponent } from "solid-js";
import { Title } from "@solidjs/meta";

export const AppTitle: Component<{ children: string }> = (props) => {
  return <Title>{`${props.children} - SlimeVR Official`}</Title>;
};
