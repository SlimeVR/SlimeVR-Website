import { Component } from "solid-js";
import { SlimeVRIcon } from "./commons/icons/SlimeVRIcon";
import { Typography } from "./commons/Typogrtaphy";
import { A } from "@solidjs/router";
import { Localized } from "@llelievr.dev/solid-fluent";
import { Button } from "./commons/Button";
import { BarsIcon } from "./commons/icons/BarsIcon";

export const Navbar: Component = (props) => {
  return (
    <div class="flex gap-2 h-18 w-full justify-between rounded-xl pl-1 pr-4 border-background-50 border-[1px] bg-background-70">
      <div class="flex gap-2 p-2 w-full justify-between md:w-auto">
        <A
          class="flex gap-2 justify-center items-center hover:bg-background-60 pl-2 pr-4 rounded-xl"
          href="/"
        >
          <SlimeVRIcon
            class="stroke-accent-background-20"
            size={60}
          ></SlimeVRIcon>
          <Typography tag="span" variant="section-title">
            SlimeVR
          </Typography>
        </A>
        <div class="items-center hidden md:flex ">
          <Button variant="primary">Order now</Button>
        </div>
        <div class="flex md:hidden justify-end">
          <button class="hover:bg-background-60">
            <BarsIcon size={20} class="fill-background-10"></BarsIcon>
          </button>
        </div>
      </div>

      <div class="hidden md:flex divide-x-[1px] divide-background-20 justify-center items-center">
        <a href="https://docs.slimevr.dev" target="_blank" class="link px-2">
          <Typography key="navbar-documentation" tag="span" />
        </a>
        <A href="/server" class="link px-2">
          <Typography tag="span">Download</Typography>
        </A>
        <a href="https://discord.gg/SlimeVR" target="_blank" class="link px-2">
          <Typography key="navbar-discord" tag="span" />
        </a>
        <a href="https://shop.slimevr.dev/" class="link px-2">
          <Typography key="navbar-shop" tag="span" />
        </a>
        <a href="https://github.com/SlimeVR" target="_blank" class="link px-2">
          <Typography key="navbar-github" tag="span" />
        </a>
        <a
          href="https://shop.slimevr.dev/pages/support"
          target="_blank"
          class="link px-2"
        >
          <Typography tag="span">Support</Typography>
        </a>
      </div>
    </div>
  );
};
