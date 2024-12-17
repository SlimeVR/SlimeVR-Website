import { Component } from "solid-js";
import { Typography } from "./commons/Typography";
import { SlimeVRIcon } from "./commons/icons/SlimeVRIcon";
import { A } from "@solidjs/router";

export const Footer: Component = (props) => {
  return (
    <footer class="bg-background-70 border-t border-background-50 w-full flex flex-col items-center">
      <div class="max-w-6xl 2xl:max-w-[1400px] w-full px-4 grid grid-cols-1 gap-5 sm:grid-cols-4 py-10">
        <div class="flex flex-col mobile:order-last mobile:items-center">
          <SlimeVRIcon
            size={150}
            class="stroke-accent-background-10"
          ></SlimeVRIcon>
          <Typography tag="p">
            © {new Date().getFullYear()} SlimeVR BV.
          </Typography>
        </div>
        <div class="flex flex-col gap-2">
          <Typography
            tag="span"
            variant="section-title"
            key="footer.column.resources.title"
          />
          <div class="flex sm:flex-col sm:gap-0.5 gap-3 flex-wrap">
            <a
              href="https://docs.slimevr.dev"
              target="_blank"
              class="link w-fit"
            >
              <Typography key="navbar.documentation" tag="span" />
            </a>
            <A
              href="/#download"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("download")
                  .scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              class="link w-fit"
            >
              <Typography tag="span" key="navbar.download" />
            </A>
            <a
              href="https://discord.gg/SlimeVR"
              target="_blank"
              class="link w-fit"
            >
              <Typography key="navbar.discord" tag="span" />
            </a>
            <a
              href="https://github.com/SlimeVR"
              target="_blank"
              class="link w-fit"
            >
              <Typography key="navbar.github" tag="span" />
            </a>
            <a
              href="https://shop.slimevr.dev/pages/support"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span" key="navbar.support" />
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Typography
            tag="span"
            variant="section-title"
            key="footer.column.shop.title"
          />
          <div class="flex sm:flex-col sm:gap-0.5 gap-3 flex-wrap">
            <a
              href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span" key="footer.column.shop.official" />
            </a>
            <a
              href="https://shop.slimevr.dev"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span" key="footer.column.shop.spare-parts" />
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Typography
            tag="span"
            variant="section-title"
            key="footer.column.social.title"
          />
          <div class="flex sm:flex-col sm:gap-0.5 gap-3 flex-wrap">
            <a
              href="https://bsky.app/profile/slimevr.dev"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span">Bluesky</Typography>
            </a>
            <a
              href="https://www.youtube.com/@SlimeVR"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span">YouTube</Typography>
            </a>
            <a
              href="https://www.tiktok.com/@officialslimevr"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span">TikTok</Typography>
            </a>
            <a
              href="https://www.reddit.com/r/SlimeVR/"
              target="_blank"
              class="link w-fit"
            >
              <Typography tag="span">Reddit</Typography>
            </a>
          </div>
        </div>
      </div>
      <div class="bg-background-80 w-full py-4">
        <div class=" flex justify-center divide-x-[1px] divide-background-20">
          {/* <A class="link px-2" href="/terms">
            <Typography tag="span" key="footer.terms" />
          </A> */}
          <A class="link px-2" href="/privacy">
            <Typography tag="span" key="footer.privacy" />
          </A>
          <a href="javascript:openAxeptioCookies()" class="link px-2">
            <Typography tag="span" key="footer.cookies" />
          </a>
        </div>
      </div>
    </footer>
  );
};
