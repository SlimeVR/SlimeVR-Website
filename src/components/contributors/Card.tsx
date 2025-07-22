import clsx from "clsx";
import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
} from "solid-js";
import { Contributor } from ".";
import { ArtistIcon } from "../commons/icons/ArtistIcon";
import { DevIcon } from "../commons/icons/DevIcon";
import { PeopleIcon } from "../commons/icons/PeopleIcon";
import { BlueskyIcon } from "../commons/icons/socials/BlueskyIcon";
import { DiscordIcon } from "../commons/icons/socials/DiscordIcon";
import { GithubIcon } from "../commons/icons/socials/GithubIcon";
import { InstagramIcon } from "../commons/icons/socials/InstagramIcon";
import { KofiIcon } from "../commons/icons/socials/KofiIcon";
import { MatrixIcon } from "../commons/icons/socials/MatrixIcon";
import { PrintablesIcon } from "../commons/icons/socials/PrintablesIcon";
import { SteamIcon } from "../commons/icons/socials/SteamIcon";
import { TiktokIcon } from "../commons/icons/socials/TiktokIcon";
import { TwitchIcon } from "../commons/icons/socials/TwitchIcon";
import { TwitterIcon } from "../commons/icons/socials/TwitterIcon";
import { WebsiteIcon } from "../commons/icons/socials/WebsiteIcon";
import { YoutubeIcon } from "../commons/icons/socials/YoutubeIcon";
import { Typography } from "../commons/Typography";
import CircularIcon from "./CircularIcon";

const fallbackColor = "#d9d9d9"; // fallback color for cards without a background or border set

interface CardProps extends Contributor {
  class?: string; // additional classes for the card
  onClick?: () => void;
  isFocused?: boolean;
  cachedImage?: { src: string; classes: string; error: boolean };
}

export const Card: ParentComponent<CardProps> = (props) => {
  const { name, roles, socials, tags, classes, onClick, cachedImage } = props;

  let card: HTMLDivElement;
  let glow: HTMLDivElement;
  let placeholder: HTMLDivElement; // placeholder for the card when focused to keep its position in list
  let innerDiv: HTMLDivElement;
  const [imageError, setImageError] = createSignal(cachedImage?.error ?? false);
  const [imageLoading, setImageLoading] = createSignal(!cachedImage);
  const [imgSrc, setImgSrc] = createSignal(
    cachedImage?.src ?? `images/contributors/jovannmc.png`
  );
  const [imgClasses, setImgClasses] = createSignal(
    cachedImage?.classes ??
      "object-contain w-[calc(100%+16px)] scale-[103%] select-none brightness-[0.01]"
  );
  // TODO: allow hover/tilting during animation without it interrupting the animation - idk how to do this without breaking other things tbh
  const [transitioning, setTransitioning] = createSignal(false); // prevent tilting while transitioning (interrupting it)
  const [isFocused, setIsFocused] = createSignal(false);
  let originalPosition: { top: number; left: number } | null = null;
  let transitionTimeout: ReturnType<typeof setTimeout> | null = null; // prevent multiple transitions / out of sync (from multiple clicks)

  let borderColor = props.color || fallbackColor;

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
    const scale = props.isFocused ? "1.4" : "1";
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

  const isMouseOverCard = (e: PointerEvent) => {
    const rect = card.getBoundingClientRect();
    const tolerance = 8; // extra pixels of tolerance to prevent glitching on edges
    return (
      e.clientX >= rect.left - tolerance &&
      e.clientX <= rect.right + tolerance &&
      e.clientY >= rect.top - tolerance &&
      e.clientY <= rect.bottom + tolerance
    );
  };

  const cardTilt = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    applyTilt(e, 15, 1.1);
  };

  const cardHoverEnter = (e: PointerEvent) => {
    if (props.isFocused || transitioning()) return;
    if (e.pointerType === "touch") return;
    card.style.transition = "transform 0.2s ease";
    document.addEventListener("pointermove", cardHoverTilt);
  };

  const cardHoverLeave = (e: PointerEvent) => {
    if (props.isFocused || transitioning()) return;
    if (e.pointerType === "touch") return;
    if (!isMouseOverCard(e)) {
      document.removeEventListener("pointermove", cardHoverTilt);
      cardReset();
    }
  };

  const cardHoverTilt = (e: PointerEvent) => {
    if (props.isFocused || transitioning()) return;
    if (e.pointerType === "touch") return;

    if (isMouseOverCard(e)) {
      applyTilt(e, 15, 0.9);
    } else {
      // mouse outside tolerance area
      document.removeEventListener("pointermove", cardHoverTilt);
      cardReset();
    }
  };

  const cardReset = () => {
    card.style.transition = "transform 0.45s ease";
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    glow.style.opacity = "0";
  };

  /*
   * General card stuff
   */

  const handleClick = () => {
    if (onClick) onClick();
  };

  const cardFocus = () => {
    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
      transitionTimeout = null;
    }

    setTransitioning(true);
    setIsFocused(true);

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
    document.removeEventListener("pointermove", cardHoverTilt);
    document.addEventListener("pointermove", cardTilt);

    transitionTimeout = setTimeout(() => {
      setTransitioning(false);
      transitionTimeout = null;
    }, 450);
  };

  const cardUnfocus = () => {
    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
      transitionTimeout = null;
    }

    setTransitioning(true);
    setIsFocused(false);

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

    document.removeEventListener("pointermove", cardTilt);
    glow.style.opacity = "0";

    // switch back to relative positioning, hide placeholder, and allow scrolling after transition completes
    transitionTimeout = setTimeout(() => {
      card.style.transition = "none";
      card.style.position = "relative";
      card.style.top = "";
      card.style.left = "";
      card.style.zIndex = "0";
      card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      placeholder.style.display = "none";
      setTransitioning(false);
      transitionTimeout = null;
    }, 450);
  };

  const cardClasses = createMemo(() => {
    return clsx(
      "max-w-[250px] max-h-[348px] w-full h-full p-2 shadow-lg flex flex-col items-center aspect-[0.72/1]",
      props.class
    );
  });

  const borderStyle = createMemo(() => {
    return { background: `${borderColor} !important` };
  });

  /*
   * Reactivity and life cycle stuff
   */

  onMount(() => {
    if (typeof window === "undefined") return null;
  });

  onCleanup(() => {
    if (typeof window === "undefined") return null;

    document.removeEventListener("pointermove", cardHoverTilt);
    document.removeEventListener("pointermove", cardTilt);

    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
      transitionTimeout = null;
    }
  });

  // loading image - shows the "fallback" image while loading or if it fails to load
  createEffect(() => {
    // if cached image data, use it and skip loading
    if (cachedImage) {
      setImgSrc(cachedImage.src);
      setImgClasses(cachedImage.classes);
      setImageError(cachedImage.error);
      setImageLoading(false);
      return;
    }

    // only load via network request if not cached
    setImageLoading(true);
    const image = new Image();
    image.src = `images/contributors/${name.toLowerCase()}.png`;
    image.onload = () => {
      setImgSrc(image.src);
      setImgClasses(
        clsx(
          "object-contain w-[calc(100%+16px)] scale-[103%] select-none",
          classes
        )
      );
      setImageError(false);
      setImageLoading(false);
    };
    image.onerror = () => {
      setImageError(true);
      setImageLoading(false);
    };
  });

  createEffect(() => {
    if (!card || !innerDiv) return;

    // ensure bg and border is set when re-rendered
    card.style.setProperty("background", borderColor, "important");
  });

  // handle focus changes
  createEffect(() => {
    if (!card || !placeholder) return;

    if (props.isFocused === true && !isFocused() && !transitioning()) {
      cardFocus();
    } else if (props.isFocused === false && isFocused()) {
      cardUnfocus();
    }
  });

  return (
    <>
      {/* invisible placeholder - used when card is focused to keep its position in list */}
      <div
        ref={placeholder}
        class={cardClasses() + " !bg-transparent !p-0"}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* the actual card*/}
      <div
        class={cardClasses() + " rounded-2xl shadow-lg relative"}
        ref={card}
        onClick={handleClick}
        onPointerEnter={cardHoverEnter}
        onPointerLeave={cardHoverLeave}
        style={borderStyle()}
        data-card-name={props["data-card-name"]}
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
          class="aspect-[0.71/1] max-w-[237px] max-h-[336px] w-full h-full flex flex-col items-center justify-evenly rounded-xl px-2 relative overflow-hidden"
        >
          {/* blurred background image */}
          <div
            class="absolute inset-0 rounded-xl z-0"
            style={{
              "background-image": `url(${imgSrc()})`,
              "background-size": "500%",
              "background-position": "center",
              filter: "blur(128px) brightness(1.5)",
            }}
            aria-hidden="true"
          />
          {/* slight blur for bg overlay */}
          <div class="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-lg rounded-xl z-0" />
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
              <div class="w-[218px] h-[141px] overflow-visible rounded-2xl rounded-tr-[70px] pattern !bg-[size:80%] !bg-[#1E2442] mt-[-2px] relative">
                <img
                  src={imgSrc()}
                  alt={name}
                  class={imgClasses()}
                  style={{
                    // so doessn't overflow with large slimes, but we scale w/ scale property up to let it overflow a lil
                    "max-height": "148px",
                    overflow: "visible",
                  }}
                />
                {(imageLoading() || imageError()) && (
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span class="text-6xl font-bold text-white select-none">
                      ?
                    </span>
                  </div>
                )}
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
