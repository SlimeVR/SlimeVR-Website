import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { CartIcon } from "../../../components/commons/icons/CartIcon";
import { CrowdSupplyIcon } from "../../../components/commons/icons/CrowdSupplyIcon";
import { DiscordIcon } from "../../../components/commons/icons/DiscordIcon";
import { DownloadIcon } from "../../../components/commons/icons/DownloadIcon";
import { scrollToSection } from "~/utils/dom";
import { Typography, ArrowButton } from "~/components/commons";

const TrackerCard: Component<{
  titleKey: string;
  mainImage: string;
  priceKey: string;
  orderKey?: string;
  href: string;
}> = (props) => {
  return (
    <div class="group bg-background-60/40 border-background-40 flex flex-col items-center justify-between gap-2 overflow-clip rounded-2xl border backdrop-blur-[9px] sm:gap-4">
      <A
        class="flex w-full flex-col items-center justify-between gap-2 px-6 pt-6 sm:gap-4"
        href={props.href}
        aria-label="Card linking to SlimeVR tracker order page"
      >
        <Typography
          tag="h1"
          textAlign="text-center"
          key={props.titleKey}
          class="text-[32px] font-bold xl:text-[38px]"
        />
        <div class="relative flex h-36 w-full items-center justify-center md:h-48 md:h-56">
          <img
            src="/images/purple_glow.webp"
            class="no-interact absolute h-full scale-200 object-contain blur-2xl"
            fetchpriority="high"
            alt=""
          />
          <img
            src="/images/tracker_card_border.webp"
            class="no-interact absolute h-full scale-[90%] object-contain transition-transform duration-500 group-hover:rotate-1"
            fetchpriority="high"
            alt=""
          />
          <img
            src={props.mainImage}
            class="no-interact absolute top-2 h-full object-contain blur-[3px] transition-transform group-hover:-rotate-3"
            alt=""
          />
          <img
            src={props.mainImage}
            class="no-interact absolute top-2 h-full object-contain transition-transform group-hover:-rotate-3"
            fetchpriority="high"
            alt="SlimeVR tracker image"
          />
        </div>
        <Typography
          key={props.priceKey}
          tag="p"
          class="text-[20px] font-bold lg:text-[18px] xl:text-[22px]"
        />
      </A>

      {/* regular version of order button */}
      <div class="hidden w-full px-6 pb-6 2xl:block">
        <ArrowButton
          variant="primary"
          prefixIcon={<CartIcon size={36}></CartIcon>}
          href={props.href}
        >
          <div class="relative flex flex-col flex-wrap justify-center pb-2">
            <Typography
              variant="section-title"
              tag="span"
              whitespace="whitespace-nowrap"
              key={props.orderKey ?? "home.hero.preorder-btn"}
            />
            <CrowdSupplyIcon size={162}></CrowdSupplyIcon>
          </div>
        </ArrowButton>
      </div>

      {/* smaller version for anything smaller than 1080p </3 */}
      <div class="block w-full px-4 pb-4 md:px-6 md:pb-6 2xl:hidden">
        <ArrowButton
          variant="primary"
          prefixIcon={<CartIcon size={30}></CartIcon>}
          href={props.href}
        >
          <div class="relative flex flex-col flex-wrap justify-center pb-2">
            <Typography
              tag="span"
              whitespace="whitespace-nowrap"
              key={props.orderKey ?? "home.hero.preorder-btn"}
              class="text-[1.2rem] font-bold"
            />
            <CrowdSupplyIcon size={144}></CrowdSupplyIcon>
          </div>
        </ArrowButton>
      </div>
    </div>
  );
};

export const HeroSection: Component = () => {
  return (
    <div class="relative my-8 flex">
      <HeroSectionFloatingNighty />

      <div class="grid w-full grid-cols-1 gap-6 md:h-[750px] md:grid-cols-12">
        <HeroSectionLeftColumn />
        <HeroSectionRightColumn />
      </div>
    </div>
  );
};

const HeroSectionFloatingNighty: Component = () => (
  <div class="animate-floating pointer-events-none absolute top-0 right-0 hidden h-full w-full justify-end py-[5%] md:flex">
    <img
      src="/images/nighty_floating_vertically.png"
      class="no-interact h-full w-auto object-contain"
      fetchpriority="high"
      alt="Nighty, the SlimeVR mascot, floating"
    />
  </div>
);

const HeroSectionLeftColumn: Component = () => (
  <div class="z-10 flex h-full flex-col justify-between gap-6 py-5 md:col-span-6">
    <Typography
      tag="h1"
      key="home.hero.description"
      textAlign="text-center"
      class="text-center text-[1.75rem] font-bold md:mt-15 md:text-left md:text-[40px]"
    />
    {/* desktop hero */}
    <div class="w-full">
      <TrackerCard
        titleKey="home.hero.butterfly-slime"
        mainImage="/images/butterfly_dock.webp"
        priceKey="home.hero.price-butterfly"
        orderKey="home.hero.preorder-btn"
        href="https://slime.gay/site-cs-bf"
      />
    </div>
  </div>
);

const HeroSectionRightColumn: Component = () => (
  <div class="z-10 flex flex-row justify-between gap-3 py-5 md:col-span-6 md:col-start-8 md:grid md:grid-cols-1 md:auto-rows-fr md:self-end">
    <div class="ml-auto grid w-full max-w-100">
      <ArrowButton
        prefixIcon={<DownloadIcon size={26}></DownloadIcon>}
        href="#download"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("download", location.pathname);
        }}
      >
        <Typography
          variant="section-title"
          bold
          tag="span"
          class="max-lg:!text-[1.1rem]"
          key="home.hero.download-server.title"
        />
        <Typography
          tag="p"
          key="home.hero.download-server.desc"
          class="max-lg:!text-sm"
        />
      </ArrowButton>
    </div>

    <div class="ml-auto grid w-full max-w-100">
      <ArrowButton
        prefixIcon={<DiscordIcon size={26}></DiscordIcon>}
        class="h-full"
        href="https://discord.gg/SlimeVR"
      >
        <Typography
          variant="section-title"
          tag="span"
          class="max-lg:!text-[1.1rem]"
          key="home.hero.join-discord.title"
        />
        <Typography
          tag="p"
          key="home.hero.join-discord.desc"
          class="max-lg:!text-sm"
        />
      </ArrowButton>
    </div>
  </div>
);
