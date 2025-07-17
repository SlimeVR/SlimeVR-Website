import clsx from "clsx";
import {
  ComponentProps,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
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
import { SteamIcon } from "../commons/icons/socials/SteamIcon";
import { MatrixIcon } from "../commons/icons/socials/MatrixIcon";

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

export const Card: ParentComponent<CardProps> = (initialProps) => {
  const props = mergeProps({} satisfies Partial<CardProps>, initialProps);
  const { name, roles, socials, image, tags } = props.contributor;

  let card: HTMLDivElement;
  let glow: HTMLDivElement;
  const [focus, setFocus] = createSignal(false);

  const applyTilt = (e: MouseEvent, intensity: number, glowOpacity: number) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rawX = (x - centerX) / centerX;
    const rawY = -((y - centerY) / centerY);

    const percentX = rawX / (1 + Math.abs(rawX) * 0.6);
    const percentY = rawY / (1 + Math.abs(rawY) * 0.6);

    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateY(${percentX * intensity}deg) rotateX(${percentY * intensity}deg)`;
    glow.style.opacity = glowOpacity.toString();
    glow.style.backgroundImage = `
                radial-gradient(
                    circle at 
                    ${x}px ${y}px, 
                    #ffffff${Math.round(glowOpacity * 102)
                      .toString(16)
                      .padStart(2, "0")},
                    #0000000f
                )
            `;
  };

  const cardTilt = (e: MouseEvent) => applyTilt(e, 15, 1);
  const cardHoverTilt = (e: MouseEvent) => {
    if (focus()) return;
    applyTilt(e, 15, 0.7);
  };

  const cardReset = () => {
    card.style.transition = "transform 0.5s ease";
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    glow.style.opacity = "0";
  };

  const cardHoverEnter = () => {
    if (focus()) return;
    card.style.transition = "transform 0.2s ease";
    card.addEventListener("mousemove", cardHoverTilt);
  };

  const cardHoverLeave = () => {
    if (focus()) return;
    card.removeEventListener("mousemove", cardHoverTilt);
    cardReset();
  };

  const cardFocus = () => {
    if (focus()) return;
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    card.style.scale = "1.3";
    card.style.zIndex = "1";
    const pos = card.getBoundingClientRect();
    card.style.top =
      window.innerHeight / 2 - card.clientHeight / 2 - pos.top + "px";
    card.style.left =
      window.innerWidth / 2 - card.clientWidth / 2 - pos.left + "px";
    card.style.boxShadow = "0px 10px 20px 8px #02111db8";
    card.removeEventListener("mousemove", cardHoverTilt);
    document.addEventListener("mousemove", cardTilt);
    setFocus(true);
  };

  const handleClick = (e: MouseEvent) => {
    if (focus() && !isOnCard(e.x, e.y)) {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      card.style.scale = "1";
      card.style.position = "relative";
      card.style.top = "0px";
      card.style.left = "0px";
      card.style.zIndex = "0";
      card.style.boxShadow = "none";
      document.removeEventListener("mousemove", cardTilt);
      setFocus(false);
      cardReset();
    }
  };

  const isOnCard = (x: number, y: number) => {
    const pos = card.getBoundingClientRect();
    return x >= pos.left && x <= pos.right && y >= pos.top && y <= pos.bottom;
  };

  onMount(() => {
    if (typeof window === "undefined") {
      return null;
    }
    document.addEventListener("mouseup", handleClick);
  });

  onCleanup(() => {
    if (typeof window === "undefined") {
      return null;
    }
    document.removeEventListener("mouseup", handleClick);
  });

  const classes = createMemo(() => {
    return clsx(
      "max-w-[250px] max-h-[348px] w-full h-full p-2 bg-background-60 shadow-lg flex flex-col items-center aspect-[0.72/1]",
      "",
      props.class
    );
  });

  return (
    // TODO: background and border styles
    <div
      class={classes() + "bg-background-40 rounded-2xl shadow-lg relative"}
      ref={card}
      onClick={focus() ? null : cardFocus}
      onMouseEnter={cardHoverEnter}
      onMouseLeave={cardHoverLeave}
    >
      <div
        ref={glow}
        class="absolute w-full h-full rounded-2xl transition-opacity duration-200"
        onMouseEnter={() => glow && (glow.style.transitionDuration = "0.2s")}
        onMouseLeave={() => glow && (glow.style.transitionDuration = "0.4s")}
      ></div>
      <div class="aspect-[0.71/1] max-w-[237px] max-h-[336px] w-full h-full bg-background-40 flex flex-col items-center justify-evenly rounded-xl px-2">
        {/* card header - name, role(s), image */}
        <div class="flex flex-col flex-1">
          <div class="flex flex-row justify-between p-2">
            <Typography
              tag="h3"
              variant="section-title"
              color="text-background-90"
            >
              {name}
            </Typography>
            {/* roles */}
            <div class="flex flex-row -space-x-2.5 mt-1">
              {roles.includes("dev") && (
                <CircularIcon size={32} class="z-0">
                  <DevIcon size={22} />
                </CircularIcon>
              )}
              {roles.includes("artist") && (
                <CircularIcon size={32} class="z-1">
                  <ArtistIcon size={22} />
                </CircularIcon>
              )}
              {roles.includes("community") && (
                <CircularIcon size={32} class="z-2">
                  <PeopleIcon size={26} />
                </CircularIcon>
              )}
            </div>
          </div>
          {/* card image - bg and slime photo */}
          <div class="w-full rounded-2xl rounded-tr-[70px] pattern !bg-[size:80%] !bg-[#1E2442] mt-[-2px]">
            <img src={image} alt={name} class="object-cover h-full" />
          </div>
        </div>

        {/* card info/footer */}
        <div class="flex flex-col items-center gap-4 flex-1 mt-4">
          {/* socials */}
          {Object.keys(socials).length > 0 && (
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
                      {key === "twitch" && (
                        <TwitchIcon size={18} class="mt-[2px] mr-[2px]" />
                      )}
                      {key === "kofi" && <KofiIcon size={20} />}
                      {key === "discord" && <DiscordIcon size={20} />}
                      {key === "tiktok" && <TiktokIcon size={20} />}
                      {key === "printables" && <PrintablesIcon size={18} />}
                      {key === "steam" && <SteamIcon size={18} />}
                      {key === "matrix" && <MatrixIcon size={16} />}
                      {key === "website" && <WebsiteIcon size={20} />}
                    </a>
                  </CircularIcon>
                );
              })}
            </div>
          )}

          {/* tags */}
          {tags && tags.length > 0 && (
            <div class="flex flex-row flex-wrap gap-2 justify-center">
              {tags.map((tag, i) => (
                <span class="bg-background-10 opacity-80 text-background-90 px-4 py-1.5 text-xs rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
