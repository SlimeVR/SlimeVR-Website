import clsx from "clsx";
import {
  ComponentProps,
  createMemo,
  mergeProps,
  ParentComponent,
} from "solid-js";
import CircularIcon from "./CircularIcon";
import { DevIcon } from "../commons/icons/DevIcon";
import { ArtistIcon } from "../commons/icons/ArtistIcon";
import { Typography } from "../commons/Typography";
import { Contributor } from ".";
import { PeopleIcon } from "../commons/icons/PeopleIcon";
import { GithubIcon } from "../commons/icons/socials/GithubIcon";
import { TwitterIcon } from "../commons/icons/socials/TwitterIcon";
import { BlueskyIcon } from "../commons/icons/socials/BlueskyIcon";
import { InstagramIcon } from "../commons/icons/socials/InstagramIcon";
import { YoutubeIcon } from "../commons/icons/socials/YoutubeIcon";
import { TwitchIcon } from "../commons/icons/socials/TwitchIcon";
import { KofiIcon } from "../commons/icons/socials/KofiIcon";
import { DiscordIcon } from "../commons/icons/socials/DiscordIcon";
import { WebsiteIcon } from "../commons/icons/socials/WebsiteIcon";
import { TiktokIcon } from "../commons/icons/socials/TiktokIcon";
import { PrintablesIcon } from "../commons/icons/socials/PrintablesIcon";

interface Background {
  // TODO: background structure
}

interface Border {
  // TODO: border structure
}

interface CardProps extends ComponentProps<"div"> {
  contributor: Contributor;
  background: Background;
  border: Border;
}

// TODO: fancy pokemon card-like hover/glowy effects (steal from branch or https://poke-holo.simey.me/ :nya_umu:)
export const Card: ParentComponent<CardProps> = (initialProps) => {
  const props = mergeProps({} satisfies Partial<CardProps>, initialProps);
  const { name, roles, socials, image, tags } = props.contributor;

  const classes = createMemo(() => {
    return clsx(
      "max-w-[250px] max-h-[348px] w-full h-full p-2 bg-background-60 shadow-lg flex flex-col items-center aspect-[0.72/1]",
      "",
      props.class
    );
  });

  return (
    // TODO: background and border styles
    <div class={classes() + "bg-background-40 rounded-2xl shadow-lg"}>
      <div class="aspect-[0.71/1] max-w-[237px] max-h-[336px] w-full h-full bg-background-40 flex flex-col items-center justify-evenly rounded-xl px-2">
        {/* card header - name, role(s), image */}
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <Typography
              tag="h3"
              variant="section-title"
              color="text-background-90"
            >
              {name}
            </Typography>
            {/* TODO: scale with card size (?) */}
            <div class="flex flex-row -space-x-2.5">
              {roles.includes("dev") && (
                <CircularIcon size={32} class="z-0">
                  <DevIcon size={22} />
                </CircularIcon>
              )}
              {roles.includes("artist") && (
                <CircularIcon size={32} class="z-10">
                  <ArtistIcon size={22} />
                </CircularIcon>
              )}
              {roles.includes("community") && (
                <CircularIcon size={32} class="z-20">
                  <PeopleIcon size={26} />
                </CircularIcon>
              )}
            </div>
          </div>
          {/* card image - bg and slime photo */}
          <div class="w-full rounded-2xl rounded-tr-[70px] pattern">
            <img src={image} alt={name} class="object-cover h-full" />
          </div>
        </div>

        {/* card info/footer */}
        <div class="flex flex-col items-center gap-4">
          {/* socials */}
          <div class="flex flex-row flex-wrap gap-2 justify-center">
            {Object.entries(socials).map(([key, value], i) => {
              if (!value) return null;
              return (
                <CircularIcon size={30}>
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    {key === "github" && <GithubIcon size={20} />}
                    {key === "twitter" && <TwitterIcon size={20} />}
                    {key === "bluesky" && <BlueskyIcon size={18} />}
                    {key === "instagram" && <InstagramIcon size={22} />}
                    {key === "youtube" && <YoutubeIcon size={22} />}
                    {key === "twitch" && <TwitchIcon size={18} class="mt-[2px] mr-[2px]" />}
                    {key === "kofi" && <KofiIcon size={20} />}
                    {key === "discord" && <DiscordIcon size={20} />}
                    {key === "tiktok" && <TiktokIcon size={20} />}
                    {key === "printables" && <PrintablesIcon size={18} />}
                    {key === "website" && <WebsiteIcon size={20} />}
                  </a>
                </CircularIcon>
              );
            })}
          </div>

          {/* tags */}
          <div class="flex flex-row flex-wrap gap-2 justify-center">
            {tags.map((tag, i) => (
              <span class="bg-background-10 opacity-80 text-background-90 px-4 py-1.5 text-xs rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
