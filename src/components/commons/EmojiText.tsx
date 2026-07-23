import { Component, For } from "solid-js";
import { splitEmoji } from "~/utils/markdown.helper";

interface EmojiTextProps {
  text: string;
  class?: string;
}

export const EmojiText: Component<EmojiTextProps> = (props) => {
  const parts = splitEmoji(props.text);

  return (
    <span class={props.class}>
      <For each={parts}>
        {(part) =>
          part.type === "emoji" ? (
            <img
              src={`/posts/emoji/${part.emojiName}-${part.emojiId}.webp`}
              alt={`:${part.emojiName}:`}
              loading="lazy"
              class="emoji-inline"
            />
          ) : (
            part.value
          )
        }
      </For>
    </span>
  );
};
