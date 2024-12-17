import {
  children,
  Component,
  JSX,
  mergeProps,
  ParentComponent,
  splitProps,
} from "solid-js";
import { Typography } from "../commons/Typography";
import {
  AndroidIcon,
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from "../../components/commons/icons/PlatformIcons";
import { A, AnchorProps } from "@solidjs/router";
import clsx from "clsx";
import { DonwloadIcon } from "../../components/commons/icons/DownloadIcon";

interface DownloadButtonProps extends AnchorProps {
  prefixIcon?: JSX.Element;
  variant?: "primary" | "default";
}

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
        "flex items-center sm:gap-5 gap-2 bg-background-60 rounded-2xl p-3 sm:pl-5 sm:pr-5 px-5 hover:cursor-pointer group hover:bg-background-50 opacity-95 transition-colors border",
        props.variant === "primary"
          ? "border-status-success"
          : "border-background-30"
      )}
    >
      <div
        class={clsx(
          "w-12 justify-center group-hover:fill-status-success fill-white hidden sm:flex"
        )}
      >
        {prefixIcon()}
      </div>
      <div class="flex flex-col flex-grow">{props.children}</div>
      <div class="flex w-9">
        <DonwloadIcon size={30} class="fill-background-10"></DonwloadIcon>
      </div>
    </A>
  );
};

export const DownloadSection: Component = () => {
  return (
    <div class="flex flex-col gap-4 w-full items-center" id="download">
      <Typography tag="h2" variant="main-title" textAlign="text-center">
        Download SlimeVR Server
      </Typography>
      <div class="flex gap-4 md:gap-8 flex-col md:flex-row w-full">
        <div class="flex flex-col gap-2 md:w-[500px]">
          <Typography tag="h3" textAlign="text-center" variant="section-title">
            Desktop
          </Typography>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 ">
            <DownloadButton
              prefixIcon={<WindowsIcon size={45}></WindowsIcon>}
              href="https://github.com/SlimeVR/SlimeVR-Installer/releases/latest/download/slimevr_web_installer.exe"
              target="_blank"
            >
              <Typography variant="section-title" tag="span">
                Windows
              </Typography>
            </DownloadButton>
            <DownloadButton
              prefixIcon={<LinuxIcon size={45}></LinuxIcon>}
              href="https://flathub.org/apps/dev.slimevr.SlimeVR"
              target="_blank"
            >
              <Typography variant="section-title" tag="span">
                Linux
              </Typography>
            </DownloadButton>
            <DownloadButton
              prefixIcon={<AppleIcon size={40}></AppleIcon>}
              href="https://github.com/SlimeVR/SlimeVR-Server/releases/latest/download/SlimeVR-mac.dmg"
              target="_blank"
            >
              <Typography variant="section-title" tag="span">
                MacOS
              </Typography>
            </DownloadButton>
          </div>
          <div class="pt-4">
            <Typography
              tag="h3"
              textAlign="text-center"
              variant="section-title"
            >
              Mobile
            </Typography>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            <DownloadButton
              prefixIcon={<AndroidIcon size={55}></AndroidIcon>}
              href="https://github.com/SlimeVR/SlimeVR-Server/releases/latest/download/SlimeVR-android.apk"
              target="_blank"
            >
              <Typography variant="section-title" tag="span">
                Android
              </Typography>
            </DownloadButton>
            <DownloadButton
              prefixIcon={<AppleIcon size={40}></AppleIcon>}
              href="https://discord.com/channels/817184208525983775/1121564912292986880"
              target="_blank"
            >
              <Typography variant="section-title" tag="span">
                IOS
              </Typography>
            </DownloadButton>
          </div>
        </div>
        <div class="pointer-events-none select-none w-full flex flex-col justify-center flex-grow pr-8">
          <div class="w-full relative aspect-video mt-4">
            <div class="bg-background-70 rounded-lg border border-background-40 absolute w-full top-0 left-0">
              <img
                src="/images/slimevr_desktop.webp"
                class="w-full aspect-video p-2 rounded-2xl"
                loading="lazy"
              ></img>
            </div>

            <div class="bg-background-70 rounded-lg border border-background-40 absolute overflow-clip top-[15%] sm:top-[12%] md:top-[16%] -right-8 p-1 shadow-background-80 w-1/4 sm:w-[27%] md:w-[24%]">
              <img
                class="w-full rounded-lg"
                loading="lazy"
                src="/images/slimevr_mobile.webp"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
