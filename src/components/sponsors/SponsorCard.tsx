import { Component } from "solid-js";

export interface Sponsor {
  id: string;
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
      class="group flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200 hover:bg-background-60 hover:scale-105"
      title={props.sponsor.name}
    >
      <div class="relative">
        <img
          src={props.sponsor.avatarUrl}
          alt={props.sponsor.name}
          class="w-16 h-16 rounded-full object-cover border-2 border-background-40 group-hover:border-accent-100 transition-colors duration-200"
          loading="lazy"
        />
      </div>
      <span class="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200 text-center truncate max-w-20">
        {props.sponsor.name}
      </span>
    </a>
  );
};
