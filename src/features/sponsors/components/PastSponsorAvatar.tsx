import { Component } from "solid-js";
import { Sponsor } from "./SponsorCard";

interface PastSponsorAvatarProps {
  sponsor: Sponsor;
}

export const PastSponsorAvatar: Component<PastSponsorAvatarProps> = (props) => {
  return (
    <a
      href={props.sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      class="group transition-all duration-200 hover:scale-110"
      title={props.sponsor.name}
    >
      <img
        src={props.sponsor.avatarUrl}
        alt={props.sponsor.name}
        class="border-background-40 group-hover:border-accent-100 h-10 w-10 rounded-full border object-cover grayscale transition-colors duration-200 group-hover:grayscale-0"
        loading="lazy"
      />
    </a>
  );
};
