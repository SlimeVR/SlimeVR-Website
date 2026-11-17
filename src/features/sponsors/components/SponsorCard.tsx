import { Component } from "solid-js";

export interface Sponsor {
  name: string;
  url: string;
  avatarUrl: string;
}

interface SponsorCardProps {
  sponsor: Sponsor;
}

export const SponsorCard: Component<SponsorCardProps> = (props) => {
  return (
    <a
      href={props.sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      class="group hover:bg-background-60 flex flex-col items-center gap-2 rounded-lg p-4 transition-all duration-200 hover:scale-105"
      title={props.sponsor.name}
    >
      <div class="relative">
        <img
          src={props.sponsor.avatarUrl}
          alt={props.sponsor.name}
          class="border-background-40 group-hover:border-accent-100 h-16 w-16 rounded-full border-2 object-cover transition-colors duration-200"
          loading="lazy"
        />
      </div>
      <span class="text-text-secondary group-hover:text-text-primary max-w-20 truncate text-center text-sm transition-colors duration-200">
        {props.sponsor.name}
      </span>
    </a>
  );
};
