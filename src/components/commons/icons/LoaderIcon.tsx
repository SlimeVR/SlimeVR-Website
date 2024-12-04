import { Match, Switch } from "solid-js";

export enum SlimeState {
  HAPPY,
  SAD,
  JUMPY,
  CURIOUS,
}

export function LoaderIcon({
  slimeState = "Happy",
  size = 85,
}: {
  slimeState: "Happy" | "Sad" | "Jumpy" | "Curious";
  size?: number | string;
}) {
  return (
    <Switch>
      <Match when={slimeState === "Jumpy"}>
        <img
          src="/images/jumping-slime.gif"
          alt="Slime jumping"
          width={size}
        ></img>
      </Match>
      <Match when={slimeState === "Happy"}>
        <img src="/images/happy-slime.gif" alt="Happy slime" width={size}></img>
      </Match>
      <Match when={slimeState === "Sad"}>
        <img src="/images/sad-slime.gif" alt="Sad slime" width={size}></img>
      </Match>
      <Match when={slimeState === "Curious"}>
        <img
          src="/images/curious-slime.gif"
          alt="Slime looking for something"
          width={size}
        ></img>
      </Match>
    </Switch>
  );
}
