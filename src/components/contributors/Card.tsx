import clsx from "clsx";
import {
  ComponentProps,
  createEffect,
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

interface CardProps extends ComponentProps<"div"> {
  contributor: Contributor;
  background: string;
  border: string;
}

export const Card: ParentComponent<CardProps> = (initialProps) => {
  const props = mergeProps({} satisfies Partial<CardProps>, initialProps);
  const { name, roles, socials, image, tags } = props.contributor;

  let card: HTMLDivElement;
  let glow: HTMLDivElement;
  let placeholder: HTMLDivElement; // placeholder for the card when focused to keep its position in list
  let innerDiv: HTMLDivElement;
  const [focus, setFocus] = createSignal(false);
  // TODO: allow hover/tilting during animation without it interrupting the animation - idk how to do this without breaking other things tbh
  const [transitioning, setTransitioning] = createSignal(false); // prevent tilting while transitioning (interrupting it)
  let originalPosition: { top: number; left: number } | null = null;
  let transitionTimeout: ReturnType<typeof setTimeout> | null = null; // prevent multiple transitions / out of sync (from multiple clicks)

  /*
   * Tilt effect things for card
   */

  const applyTilt = (e: MouseEvent, intensity: number, glowOpacity: number) => {
    if (transitioning()) return;

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
    const scale = focus() ? "1.4" : "1";
    card.style.transform = `perspective(1000px) rotateY(${percentX * intensity}deg) rotateX(${percentY * intensity}deg) scale(${scale})`;
    glow.style.opacity = glowOpacity.toString();
    glow.style.backgroundImage = `
                radial-gradient(
                    circle at 
                    ${x}px ${y}px, 
                    #ffffff${Math.round(glowOpacity * 100)
                      .toString(16)
                      .padStart(2, "0")},
                    #0000000f
                )
            `;
  };

  const cardTilt = (e: MouseEvent) => {
    applyTilt(e, 15, 1.2);
  };

  const cardHoverTilt = (e: MouseEvent) => {
    if (focus() || transitioning()) return;
    applyTilt(e, 15, 1);
  };

  const cardReset = () => {
    card.style.transition = "transform 0.45s ease";
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    glow.style.opacity = "0";
  };

  const cardHoverEnter = () => {
    if (focus() || transitioning()) return;
    card.style.transition = "transform 0.2s ease";
    card.addEventListener("mousemove", cardHoverTilt);
  };

  const cardHoverLeave = () => {
    if (focus() || transitioning()) return;
    card.removeEventListener("mousemove", cardHoverTilt);
    cardReset();
  };

  /*
   * General card stuff
   */

  const isOnCard = (x: number, y: number) => {
    const pos = card.getBoundingClientRect();
    return x >= pos.left && x <= pos.right && y >= pos.top && y <= pos.bottom;
  };

  const cardFocus = () => {
    if (focus() || transitioning()) return;

    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
      transitionTimeout = null;
    }

    setTransitioning(true);

    // store original position before moving to return to later
    const rect = card.getBoundingClientRect();
    originalPosition = {
      top: rect.top,
      left: rect.left,
    };

    placeholder.style.display = "block";

    card.style.transition = "none";
    card.style.zIndex = "10";
    card.style.position = "fixed";
    card.style.top = `${rect.top}px`;
    card.style.left = `${rect.left}px`;
    card.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";

    card.offsetHeight;
    card.style.transition =
      "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease";

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    card.style.transformOrigin = "center center";
    const centerX = viewportWidth / 2 - card.clientWidth / 2;
    const centerY = viewportHeight / 2 - card.clientHeight / 2;

    card.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.4)";
    card.style.top = `${centerY}px`;
    card.style.left = `${centerX}px`;
    card.style.boxShadow = "0px 10px 20px 8px #02111db8";
    card.removeEventListener("mousemove", cardHoverTilt);
    document.addEventListener("mousemove", cardTilt);

    // prevent scrolling when card is focused
    document.body.style.overflow = "hidden";

    setFocus(true);

    transitionTimeout = setTimeout(() => {
      setTransitioning(false);
      transitionTimeout = null;
    }, 450);
  };

  const handleClick = (e: MouseEvent) => {
    if (focus() && !isOnCard(e.x, e.y)) {
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
        transitionTimeout = null;
      }

      setTransitioning(true);

      card.style.zIndex = "5"; // lower z-index for cards unfocusing so the new one takes priority
      card.style.transition =
        "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease";
      card.style.boxShadow = "none";

      if (originalPosition) {
        card.style.top = `${originalPosition.top}px`;
        card.style.left = `${originalPosition.left}px`;
      }
      card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";

      document.removeEventListener("mousemove", cardTilt);
      glow.style.opacity = "0";

      setFocus(false);

      // switch back to relative positioning, hide placeholder, and allow scrolling after transition completes
      transitionTimeout = setTimeout(() => {
        card.style.transition = "none";
        card.style.position = "relative";
        card.style.top = "";
        card.style.left = "";
        card.style.zIndex = "0";
        card.style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
        placeholder.style.display = "none";
        document.body.style.overflow = "";
        setTransitioning(false);
        transitionTimeout = null;
      }, 450);
    }
  };

  const classes = createMemo(() => {
    return clsx(
      "max-w-[250px] max-h-[348px] w-full h-full p-2 shadow-lg flex flex-col items-center aspect-[0.72/1]",
      props.class
    );
  });

  const borderStyle = createMemo(() => {
    const borderColor = props.border;
    return { background: `${borderColor} !important` };
  });

  const backgroundStyle = createMemo(() => {
    const color = props.background;

    if (color.startsWith("linear-gradient")) {
      return { background: `${color} !important` };
    }

    return {
      background: `radial-gradient(circle at center, ${color}, ${color}66) !important`,
    };
  });

  /*
   * Reactivity and life cycle stuff
   */

  onMount(() => {
    if (typeof window === "undefined") return null;

    document.addEventListener("mouseup", handleClick);
  });

  onCleanup(() => {
    if (typeof window === "undefined") return null;

    document.removeEventListener("mouseup", handleClick);
    document.removeEventListener("mousemove", cardTilt);
    card.removeEventListener("mousemove", cardHoverTilt);

    if (focus()) document.body.style.overflow = "";

    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
      transitionTimeout = null;
    }
  });

  createEffect(() => {
    if (!card || !innerDiv) return;

    // ensure bg and border is set when re-rendered
    const borderColor = props.border;
    card.style.setProperty("background", borderColor, "important");

    const bgColor = props.background;
    if (bgColor.startsWith("linear-gradient")) {
      innerDiv.style.setProperty("background", bgColor, "important");
    } else {
      innerDiv.style.setProperty(
        "background",
        `radial-gradient(circle at center, ${bgColor}, ${bgColor}66)`,
        "important"
      );
    }
  });

  return (
    <>
      {/* invisible placeholder - used when card is focused to keep its position in list */}
      <div
        ref={placeholder}
        class={classes() + " !bg-transparent !p-0"}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* the actual card*/}
      <div
        class={classes() + " rounded-2xl shadow-lg relative"}
        ref={card}
        onClick={focus() ? null : cardFocus}
        onMouseEnter={cardHoverEnter}
        onMouseLeave={cardHoverLeave}
        style={borderStyle()}
      >
        {/* glow effect when hovering */}
        <div
          ref={glow}
          class="absolute inset-0 rounded-2xl transition-opacity duration-200 pointer-events-none z-20"
          onMouseEnter={() => glow && (glow.style.transitionDuration = "0.2s")}
          onMouseLeave={() => glow && (glow.style.transitionDuration = "0.45s")}
        />
        <div
          ref={innerDiv}
          class="aspect-[0.71/1] max-w-[237px] max-h-[336px] w-full h-full flex flex-col items-center justify-evenly rounded-xl px-2 relative"
          style={backgroundStyle()}
        >
          {/* slight blur for bg */}
          <div class="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-lg rounded-xl" />
          <div class="relative z-10 w-full h-full flex flex-col items-center justify-evenly">
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
                    <CircularIcon size={32} class="z-1">
                      <DevIcon size={22} />
                    </CircularIcon>
                  )}
                  {roles.includes("artist") && (
                    <CircularIcon size={32} class="z-2">
                      <ArtistIcon size={22} />
                    </CircularIcon>
                  )}
                  {roles.includes("community") && (
                    <CircularIcon size={32} class="z-3">
                      <PeopleIcon size={26} />
                    </CircularIcon>
                  )}
                </div>
              </div>
              {/* card image - bg and slime photo */}
              <div class="w-full rounded-2xl rounded-tr-[70px] pattern !bg-[size:80%] !bg-[#1E2442] mt-[-2px]">
                <img src={image} alt={name} class="object-cover w-full" />
              </div>
            </div>

            {/* card info/footer */}
            <div class="flex flex-col items-center gap-4 flex-1 mt-4">
              {/* socials */}
              {Object.keys(socials).length > 0 && (
                <div class="flex flex-row flex-wrap gap-2 justify-center min-h-[32px]">
                  {Object.entries(socials).map(([key, value], i) => {
                    if (!value) return null;
                    return (
                      <CircularIcon size={30}>
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
      </div>
    </>
  );
};
