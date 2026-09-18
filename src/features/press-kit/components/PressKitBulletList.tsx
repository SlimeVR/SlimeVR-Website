import { Component, For } from "solid-js";
import { Typography } from "~/components/commons";
import { PressKitBulletListProps } from "./PressKit";

export const PressKitBulletList: Component<PressKitBulletListProps> = (props) => (
  <ul class="list-disc pl-5 flex flex-col gap-2">
    <For each={props.items}>
      {(item) => (
        <li>
          <Typography tag="span">{item}</Typography>
        </li>
      )}
    </For>
  </ul>
);
