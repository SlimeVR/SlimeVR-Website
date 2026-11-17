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
import { DownloadIcon } from "../../../components/commons/icons/DownloadIcon";
import {
  AndroidIcon,
  AppleIcon,
  LinuxIcon,
  SideQuestIcon,
  WindowsIcon,
} from "../../../components/commons/icons/PlatformIcons";
import { Typography } from "../../../components/commons/Typography";
import { SteamIcon } from "../../../components/commons/icons/socials/SteamIcon";

interface DownloadButtonProps extends AnchorProps {
  prefixIcon?: JSX.Element;
  variant?: "primary" | "default";
}

const DownloadLinks = {
  desktop: [
    {
      name: "Steam",
      href: "https://store.steampowered.com/app/3245490/SlimeVR/",
      icon: () => <SteamIcon variant="download" size={50}></SteamIcon>,
    },
    {
      name: "Windows",
      href: "https://github.com/SlimeVR/SlimeVR-Installer/releases/latest/download/slimevr_web_installer.exe",
      icon: () => <WindowsIcon size={40}></WindowsIcon>,
    },
    {
      name: "Linux",
      href: "https://flathub.org/apps/dev.slimevr.SlimeVR",
      icon: () => <LinuxIcon size={40}></LinuxIcon>,
    },
    {
      name: "MacOS",
      href: "https://github.com/SlimeVR/SlimeVR-Server/releases/latest/download/SlimeVR-mac.dmg",
      icon: () => <AppleIcon size={35}></AppleIcon>,
    },
  ],
  mobile: [
    {
      name: "Android",
      href: "https://play.google.com/store/apps/details?id=dev.slimevr.server.android",
      icon: () => <AndroidIcon size={50}></AndroidIcon>,
    },
    {
      name: "SideQuest",
      href: "https://sidequestvr.com/app/45270/slimevr",
      icon: () => <SideQuestIcon size={50}></SideQuestIcon>,
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
        "bg-background-60 group hover:bg-background-50 flex min-h-19 items-center gap-2 rounded-2xl border p-3 px-5 opacity-95 transition-colors hover:cursor-pointer sm:gap-5 sm:pr-5 sm:pl-5",
        props.variant === "primary"
          ? "border-status-success"
          : "border-background-40"
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        class={clsx(
          "group-hover:fill-status-success hidden w-12 justify-center fill-white sm:flex"
        )}
      >
        {prefixIcon()}
      </div>
      <div class="flex grow flex-col">{props.children}</div>
      <div class="flex w-9 transition-transform duration-200 group-hover:translate-y-1">
        <DownloadIcon size={30} class="fill-background-10"></DownloadIcon>
      </div>
    </A>
  );
};

export const DownloadSection: Component = () => {
  return (
    <div class="relative flex w-full flex-col items-center gap-4" id="download">
      <div class="relative">
        <Typography tag="h2" variant="main-title" textAlign="text-center">
          Download SlimeVR Server
        </Typography>
        <div class="no-interact absolute -top-10 -left-21 -z-10 scale-90">
          <img src="/images/butterfly1.webp" alt="" loading="lazy"></img>
        </div>
      </div>
      <div class="flex w-full flex-col gap-4 md:flex-row md:gap-8">
        <div class="flex flex-col gap-2 md:w-125">
          <Typography tag="h3" textAlign="text-center" variant="section-title">
            Desktop
          </Typography>
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1">
            <For each={DownloadLinks.desktop}>
              {(link) => (
                <DownloadButton prefixIcon={link.icon()} href={link.href}>
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
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1">
            <For each={DownloadLinks.mobile}>
              {(link) => (
                <DownloadButton prefixIcon={link.icon()} href={link.href}>
                  <Typography variant="section-title" tag="span">
                    {link.name}
                  </Typography>
                </DownloadButton>
              )}
            </For>
          </div>
        </div>

        <div class="no-interact flex w-full grow flex-col justify-center pr-8">
          <div class="relative mt-4 aspect-video w-full">
            <div class="bg-background-70 border-background-40 absolute top-0 left-0 w-full rounded-lg border">
              <img
                src="/images/slimevr_desktop.webp"
                class="aspect-video w-full rounded-2xl p-2"
                loading="lazy"
                alt="SlimeVR Server running on a PC"
              ></img>
            </div>

            <div class="bg-background-70 border-background-40 shadow-background-80 absolute top-[15%] -right-8 w-1/4 overflow-clip rounded-lg border p-1 sm:top-[12%] sm:w-[27%] md:top-[16%] md:w-[24%]">
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
