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
        class="w-10 h-10 rounded-full object-cover border border-background-40 group-hover:border-accent-100 transition-colors duration-200 grayscale group-hover:grayscale-0"
        loading="lazy"
      />
    </a>
  );
};
