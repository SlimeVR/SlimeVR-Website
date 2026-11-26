import { Component, createSignal, Show } from "solid-js";
import { PlayIcon } from "./icons/PlayIcon";

interface VideoProps {
  src: string;
}

export const Video: Component<VideoProps> = (props) => {
  let player: HTMLVideoElement;
  const [playing, setPlaying] = createSignal(false);

  const togglePlay = () => {
    if (!player) throw new Error("no ref");
    if (player.paused) {
      player.play();
      setPlaying(true);
    } else {
      player.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      onClick={togglePlay}
      class="relative rounded-lg md:rounded-3xl overflow-clip bg-background-90 aspect-video"
    >
      <video ref={player} src={props.src} class="bg-background-90"></video>
      <Show when={!playing()}>
        <div class="w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <div class="w-20 h-20 bg-accent-background-20 rounded-full fill-background-10 z-10 flex justify-center items-center">
            <PlayIcon size={20}></PlayIcon>
          </div>
        </div>
      </Show>
    </div>
  );
};
