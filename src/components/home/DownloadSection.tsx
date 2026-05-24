import { A, AnchorProps } from "@solidjs/router";
import clsx from "clsx";
import {
  children,
  Component,
  For,
  JSX,
  mergeProps,
  ParentComponent,
  splitProps,
} from "solid-js";
import { DownloadIcon } from "../../components/commons/icons/DownloadIcon";
import {
  AndroidIcon,
  AppleIcon,
  LinuxIcon,
  SideQuestIcon,
  WindowsIcon,
} from "../../components/commons/icons/PlatformIcons";
import { Typography } from "../commons/Typography";
import { SteamIcon } from "../commons/icons/socials/SteamIcon";

interface DownloadButtonProps extends AnchorProps {
  prefixIcon?: JSX.Element;
  variant?: "primary" | "default";
}

const DownloadLinks = {
  desktop: [
    {
      name: "Steam",
      href: "https://store.steampowered.com/app/3245490/SlimeVR/",
      icon: <SteamIcon size={50}></SteamIcon>,
    },
    {
      name: "Windows",
      href: "https://github.com/SlimeVR/SlimeVR-Installer/releases/latest/download/slimevr_web_installer.exe",
      icon: <WindowsIcon size={40}></WindowsIcon>,
    },
    {
      name: "Linux",
      href: "https://flathub.org/apps/dev.slimevr.SlimeVR",
      icon: <LinuxIcon size={40}></LinuxIcon>,
    },
    {
      name: "MacOS",
      href: "https://github.com/SlimeVR/SlimeVR-Installer/releases/latest/download/slimevr_web_installer.dmg",
      icon: <AppleIcon size={35}></AppleIcon>,
    },
  ],
  mobile: [
    {
      name: "Android",
      href: "https://play.google.com/store/apps/details?id=dev.slimevr.server.android",
      icon: <AndroidIcon size={50}></AndroidIcon>,
    },
    {
      name: "SideQuest",
      href: "https://sidequestvr.com/app/45270/slimevr",
      icon: <SideQuestIcon size={50}></SideQuestIcon>,
    },
    // and iOS would be here.. if it ever gets better
  ],
};

export const DownloadButton: ParentComponent<DownloadButtonProps> = (
  initialProps
) => {
  const allProps = mergeProps(
    {
      variant: "default",
    } satisfies Partial<DownloadButtonProps>,
    initialProps
  );
  const [props, anchorProps] = splitProps(allProps, [
    "prefixIcon",
    "variant",
    "children",
  ]);

  const prefixIcon = children(() => props.prefixIcon);

  return (
    <A
      {...anchorProps}
      class={clsx(
        "flex items-center sm:gap-5 gap-2 bg-background-60 rounded-2xl p-3 sm:pl-5 sm:pr-5 px-5 hover:cursor-pointer group hover:bg-background-50 opacity-95 transition-colors border min-h-19",
        props.variant === "primary"
          ? "border-status-success"
          : "border-background-30"
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        class={clsx(
          "w-12 justify-center group-hover:fill-status-success fill-white hidden sm:flex"
        )}
      >
        {prefixIcon()}
      </div>
      <div class="flex flex-col grow">{props.children}</div>
      <div class="flex w-9 group-hover:translate-y-1 transition-transform duration-200">
        <DownloadIcon size={30} class="fill-background-10"></DownloadIcon>
      </div>
    </A>
  );
};

export const DownloadSection: Component = () => {
  return (
    <div class="flex flex-col gap-4 w-full items-center relative" id="download">
      <div class="relative">
        <Typography tag="h2" variant="main-title" textAlign="text-center">
          Download SlimeVR Server
        </Typography>
        <div class="absolute -top-10 -left-21 scale-90 -z-10 no-interact">
          <img src="/images/butterfly1.webp" alt="" loading="lazy"></img>
        </div>
      </div>
      <div class="flex gap-4 md:gap-8 flex-col md:flex-row w-full">
        <div class="flex flex-col gap-2 md:w-125">
          <Typography tag="h3" textAlign="text-center" variant="section-title">
            Desktop
          </Typography>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            <For each={DownloadLinks.desktop}>
              {(link) => (
                <DownloadButton prefixIcon={link.icon} href={link.href}>
                  <Typography variant="section-title" tag="span">
                    {link.name}
                  </Typography>
                </DownloadButton>
              )}
            </For>
          </div>
          <Typography
            tag="h3"
            textAlign="text-center"
            variant="section-title"
            class="pt-4"
          >
            Mobile
          </Typography>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            <For each={DownloadLinks.mobile}>
              {(link) => (
                <DownloadButton prefixIcon={link.icon} href={link.href}>
                  <Typography variant="section-title" tag="span">
                    {link.name}
                  </Typography>
                </DownloadButton>
              )}
            </For>
          </div>
        </div>

        <div class="no-interact w-full flex flex-col justify-center grow pr-8">
          <div class="w-full relative aspect-video mt-4">
            <div class="bg-background-70 rounded-lg border border-background-40 absolute w-full top-0 left-0">
              <img
                src="/images/slimevr_desktop.webp"
                class="w-full aspect-video p-2 rounded-2xl"
                loading="lazy"
                alt="SlimeVR Server running on a PC"
              ></img>
            </div>

            <div class="bg-background-70 rounded-lg border border-background-40 absolute overflow-clip top-[15%] sm:top-[12%] md:top-[16%] -right-8 p-1 shadow-background-80 w-1/4 sm:w-[27%] md:w-[24%]">
              <img
                class="w-full rounded-lg"
                loading="lazy"
                src="/images/slimevr_mobile.webp"
                alt="SlimeVR Server running on a phone"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
