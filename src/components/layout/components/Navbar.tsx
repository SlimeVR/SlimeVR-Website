import { A, useNavigate } from "@solidjs/router";
import clsx from "clsx";
import { Component, createSignal } from "solid-js";
import { Localized } from "~/i18n";
import { scrollToSection } from "~/utils/dom";
import { ArrowIcon } from "../../commons/icons/ArrowIcon";
import { BarsIcon } from "../../commons/icons/BarsIcon";
import { SlimeVRIcon } from "../../commons/icons/SlimeVRIcon";
import { Button, Typography } from "~/components/commons";

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
      <A href="/blog" class="link px-2">
        <Typography tag="span" key="navbar.blog" />
      </A>
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
        class="flex items-center gap-2 px-2 hover:underline"
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
          "absolute top-full left-1/2 z-20 min-w-max -translate-x-1/2 pt-6 pr-2 transition-opacity duration-200",
          isOpen()
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div class="bg-background-70 border-background-40 flex flex-col gap-2 rounded-lg border p-2">
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
          <div class="bg-background-40 h-px w-full" />
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
    <div class="relative flex w-full flex-col gap-4">
      <div class="bg-background-70 border-background-40 flex h-18 w-full justify-between gap-2 rounded-xl border pr-4 pl-1">
        <div class="mid:w-auto flex w-full justify-between gap-2 p-2">
          <A
            class="hover:bg-background-60 flex items-center justify-center gap-2 rounded-xl pr-4 pl-2"
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
            <div class="hidden items-center sm:flex">
              <Button
                variant="primary"
                href="https://slime.gay/site-cs-bf"
                aria-label="Order SlimeVR 1.2 trackers"
              >
                <Localized id="navbar.order" />
              </Button>
            </div>
            <div class="mid:hidden flex justify-end">
              <button
                class="hover:bg-background-60 rounded-lg px-4"
                onClick={() => setOpen((open) => !open)}
                aria-label="Toggle navigation menu"
              >
                <BarsIcon size={20} class="fill-background-10"></BarsIcon>
              </button>
            </div>
          </div>
        </div>
        <div class="divide-background-20 mid:flex hidden items-center justify-center divide-x">
          <NavItems />
        </div>
      </div>
      <div
        class={clsx(
          "divide-background-20 bg-background-70 mid:hidden absolute top-full z-10 mt-2 flex flex-col gap-2 overflow-clip",
          isOpen()
            ? "border-background-40 h-fit w-full rounded-lg border p-4"
            : "h-0"
        )}
      >
        <NavItems mobile />
      </div>
    </div>
  );
};
