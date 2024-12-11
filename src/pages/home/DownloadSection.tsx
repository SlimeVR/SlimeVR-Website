import { Component } from "solid-js";
import { Typography } from "../../components/commons/Typogrtaphy";
import { ArrowButton } from "../../components/commons/ArrowButton";
import {
  AndroidIcon,
  AppleIcon,
  LinuxIcon,
  WindowsIcon,
} from "../../components/commons/icons/PlatformIcons";

export const DownloadSection: Component = () => {
  return (
    <div class="flex flex-col gap-4 w-full" id="download">
      <div class="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
        <div class="flex flex-col gap-2 order-2 md:order-1 md:w-[500px]">
          <Typography tag="h4" textAlign="text-center" variant="section-title">
            Desktop
          </Typography>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            <ArrowButton
              prefixIcon={<WindowsIcon size={45}></WindowsIcon>}
              href="https://slimevr.dev/download"
              target="_blank"
            >
              <Typography variant="section-title" tag="h3">
                Windows
              </Typography>
            </ArrowButton>
            <ArrowButton
              prefixIcon={<LinuxIcon size={45}></LinuxIcon>}
              href="https://flathub.org/apps/dev.slimevr.SlimeVR"
              target="_blank"
            >
              <Typography variant="section-title" tag="h3">
                Linux
              </Typography>
            </ArrowButton>
            <ArrowButton
              prefixIcon={<AppleIcon size={40}></AppleIcon>}
              href="https://github.com/SlimeVR/SlimeVR-Server/releases/latest/download/SlimeVR-mac.dmg"
              target="_blank"
            >
              <Typography variant="section-title" tag="h3">
                MacOS
              </Typography>
            </ArrowButton>
          </div>
          <div class="pt-4">
            <Typography
              tag="h4"
              textAlign="text-center"
              variant="section-title"
            >
              Mobile
            </Typography>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            <ArrowButton
              prefixIcon={<AndroidIcon size={55}></AndroidIcon>}
              href="https://github.com/SlimeVR/SlimeVR-Server/releases/latest/download/SlimeVR-android.apk"
              target="_blank"
            >
              <Typography variant="section-title" tag="h3">
                Android
              </Typography>
            </ArrowButton>
            <ArrowButton
              prefixIcon={<AppleIcon size={40}></AppleIcon>}
              href="https://discord.com/channels/817184208525983775/1121564912292986880"
              target="_blank"
            >
              <Typography variant="section-title" tag="h3">
                IOS
              </Typography>
            </ArrowButton>
          </div>
        </div>
        <div class="w-full pb-12 md:pb-14 pr-12 order-1 md:order-2 pointer-events-none select-none">
          <Typography tag="h3" variant="main-title" textAlign="text-center">
            SlimeVR Server
          </Typography>
          <div class="h-full w-full relative aspect-video mt-4">
            <div class="bg-background-70 rounded-lg border border-background-40 absolute w-full top-0 left-0">
              <img
                src="https://media.discordapp.net/attachments/1049443021118255114/1316087312001794100/Screenshot_20241210_180023.png?ex=6759c552&is=675873d2&hm=ad06b5434d8222bc387762b8cf0c37aa9a168033e287f2090af90207a2b72286&=&format=webp&quality=lossless&width=825&height=463"
                class="w-full aspect-video p-2"
                loading="lazy"
              ></img>
            </div>

            <div class="bg-background-70 rounded-lg border border-background-40 absolute overflow-clip top-[15%] sm:top-[12%] md:top-[16%] -right-8 p-1 shadow-background-80 w-1/4 sm:w-[27%] md:w-[24%]">
              <img
                class="w-full"
                loading="lazy"
                src="https://media.discordapp.net/attachments/1049443021118255114/1316089544197668904/Screen_Shot_2024-12-10_at_18.09.17.png?ex=6759c767&is=675875e7&hm=5a5c8d0855c5e42c3cea71343262a6f4bf9492e43652692fd72463b14adaa00e&=&format=webp&quality=lossless&width=459&height=993"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
