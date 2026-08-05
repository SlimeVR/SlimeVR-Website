import { A, useNavigate } from "@solidjs/router";
import clsx from "clsx";
import { Component, createSignal } from "solid-js";
import { Localized } from "~/i18n";
import { scrollToSection } from "~/utils/dom";
import { Button } from "./commons/Button";
import { ArrowIcon } from "./commons/icons/ArrowIcon";
import { BarsIcon } from "./commons/icons/BarsIcon";
import { SlimeVRIcon } from "./commons/icons/SlimeVRIcon";
import { Typography } from "./commons/Typography";

const InternalLinks: Component = () => {
  const navigate = useNavigate();

  return (
    <>
      <A href="/" class="link px-2">
        <Typography tag="span">Home</Typography>
      </A>
      <A
        href="/#download"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("download", "/", navigate);
        }}
        class="link px-2"
      >
        <Typography tag="span" key="navbar.download" />
      </A>
      <A href="/events" class="link px-2">
        <Typography tag="span" key="navbar.events" />
      </A>
      {/* <A href="/events" class="link px-2">
        News
      </A> */}
      <A href="/team" class="link px-2">
        <Typography tag="span" key="navbar.team" />
      </A>
      {/* <A href="/events" class="link px-2">
        Feedback
      </A> */}
    </>
  );
};

const ExternalLinks: Component = () => {
  return (
    <>
      <a
        href="https://docs.slimevr.dev"
        target="_blank"
        rel="noopener noreferrer"
        class="link px-2"
      >
        <Typography key="navbar.documentation" tag="span" />
      </a>
      <a href="https://shop.slimevr.dev/" class="link px-2">
        <Typography key="navbar.shop" tag="span" />
      </a>
      <a
        href="https://github.com/SlimeVR"
        target="_blank"
        rel="noopener noreferrer"
        class="link px-2"
      >
        <Typography key="navbar.github" tag="span" />
      </a>
      <a
        href="https://discord.gg/SlimeVR"
        target="_blank"
        rel="noopener noreferrer"
        class="link px-2"
      >
        <Typography key="navbar.discord" tag="span" />
      </a>
      <a
        href="https://shop.slimevr.dev/pages/support"
        target="_blank"
        rel="noopener noreferrer"
        class="link px-2"
      >
        <Typography tag="span" key="navbar.support" />
      </a>
    </>
  );
};

const ResourcesDropdown: Component = () => {
  const [isOpen, setOpen] = createSignal(false);

  return (
    <div
      class="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        class="px-2 flex items-center gap-2 hover:underline"
        aria-expanded={isOpen()}
        aria-haspopup="true"
      >
        <Typography tag="span" key="navbar.resources" />
        <ArrowIcon
          direction={isOpen() ? "up" : "down"}
          type="cheveron"
          size={10}
          class="fill-background-10"
        />
      </button>
      <div
        class={clsx(
          "absolute top-full left-1/2 -translate-x-1/2 pt-6 pr-2 z-20 min-w-max transition-opacity duration-200",
          isOpen()
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div class="flex flex-col gap-2 bg-background-70 border border-background-40 rounded-lg p-2">
          <ExternalLinks />
        </div>
      </div>
    </div>
  );
};

export const NavItems: Component<{ mobile?: boolean }> = (props) => {
  return (
    <>
      <InternalLinks />
      {props.mobile ? (
        <>
          <div class="w-full h-px bg-background-40" />
          <ExternalLinks />
        </>
      ) : (
        <ResourcesDropdown />
      )}
    </>
  );
};

export const Navbar: Component = () => {
  const [isOpen, setOpen] = createSignal(false);

  return (
    <div class="flex w-full flex-col gap-4 relative">
      <div class="flex gap-2 h-18 w-full justify-between rounded-xl pl-1 pr-4 bg-background-70 border border-background-40">
        <div class="flex gap-2 p-2 w-full justify-between mid:w-auto">
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
          <div class="flex">
            <div class="items-center sm:flex hidden">
              <Button
                variant="primary"
                href="https://slime.gay/site-cs-bf"
                aria-label="Order SlimeVR 1.2 trackers"
              >
                <Localized id="navbar.order" />
              </Button>
            </div>
            <div class="flex mid:hidden justify-end">
              <button
                class="hover:bg-background-60 px-4 rounded-lg"
                onClick={() => setOpen((open) => !open)}
                aria-label="Toggle navigation menu"
              >
                <BarsIcon size={20} class="fill-background-10"></BarsIcon>
              </button>
            </div>
          </div>
        </div>
        <div class="divide-x divide-background-20 justify-center items-center hidden mid:flex">
          <NavItems />
        </div>
      </div>
      <div
        class={clsx(
          "flex flex-col divide-background-20 gap-2 absolute top-full mt-2 bg-background-70 overflow-clip z-10 mid:hidden",
          isOpen()
            ? "h-fit p-4 border border-background-40 w-full rounded-lg "
            : "h-0"
        )}
      >
        <NavItems mobile />
      </div>
    </div>
  );
};
