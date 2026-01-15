import { A, useLocation, useNavigate } from "@solidjs/router";
import clsx from "clsx";
import { Component, createSignal } from "solid-js";
import { Localized } from "~/i18n";
import { Button } from "./commons/Button";
import { BarsIcon } from "./commons/icons/BarsIcon";
import { SlimeVRIcon } from "./commons/icons/SlimeVRIcon";
import { Typography } from "./commons/Typography";

export const NavItems: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && (
        <A href="/" class="link px-2">
          <Typography tag="span">Home</Typography>
        </A>
      )}
      <a href="https://docs.slimevr.dev" target="_blank" class="link px-2">
        <Typography key="navbar.documentation" tag="span" />
      </a>
      <A
        href="/#download"
        onClick={(e) => {
          const pathname = window.location.pathname;
          e.preventDefault();
          if (pathname === "/") {
            const el = document.getElementById("download");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            // use location.state to pass scrollTo
            navigate("/", { state: { scrollTo: "download" } });
          }
        }}
        class="link px-2"
      >
        <Typography tag="span" key="navbar.download" />
      </A>
      <a href="https://discord.gg/SlimeVR" target="_blank" class="link px-2">
        <Typography key="navbar.discord" tag="span" />
      </a>
      <a href="https://shop.slimevr.dev/" class="link px-2">
        <Typography key="navbar.shop" tag="span" />
      </a>
      <a href="https://github.com/SlimeVR" target="_blank" class="link px-2">
        <Typography key="navbar.github" tag="span" />
      </a>
      <A href="/team" class="link px-2">
        <Typography tag="span" key="navbar.team" />
      </A>
      <a
        href="https://shop.slimevr.dev/pages/support"
        target="_blank"
        class="link px-2"
      >
        <Typography tag="span" key="navbar.support" />
      </a>
    </>
  );
};

export const Navbar: Component = (props) => {
  const [isOpen, setOpen] = createSignal(false);

  return (
    <div class="flex w-full flex-col gap-4 relative">
      <div class="flex gap-2 h-18 w-full justify-between rounded-xl pl-1 pr-4 bg-background-70 border border-background-40">
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
          <div class="items-center hidden md:flex">
            <Button
              variant="primary"
              href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
            >
              <Localized id="navbar.order" />
            </Button>
          </div>
          <div class="flex md:hidden justify-end">
            <button
              class="hover:bg-background-60 px-4 rounded-lg"
              onClick={() => setOpen((open) => !open)}
            >
              <BarsIcon size={20} class="fill-background-10"></BarsIcon>
            </button>
          </div>
        </div>
        <div class="divide-x-[1px] divide-background-20 justify-center items-center hidden md:flex">
          <NavItems></NavItems>
        </div>
      </div>
      <div
        class={clsx(
          "flex flex-col divide-background-20 gap-2 absolute top-full mt-2 bg-background-70 overflow-clip z-10 md:hidden",
          isOpen()
            ? "h-fit p-4 border border-background-40 w-full rounded-lg "
            : "h-0"
        )}
      >
        <NavItems></NavItems>
      </div>
    </div>
  );
};
