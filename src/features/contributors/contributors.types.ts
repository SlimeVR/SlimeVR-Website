export interface ContributorDisplay {
  name: string;
  src: string;
}

export interface Contributor {
  name: string; // internal name for caching not displayed (display#name for user-facing)
  display: ContributorDisplay[];
  roles: ("dev" | "artist" | "community")[];
  color?: string;
  socials: {
    twitter?: string;
    bluesky?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    twitch?: string;
    kofi?: string;
    discord?: string;
    tiktok?: string;
    printables?: string;
    vgen?: string;
    booth?: string;
    soundcloud?: string;
    steam?: string;
    matrix?: string;
    reddit?: string;
    patreon?: string;
  };
  tags: string[];
  classes?: string;
}
