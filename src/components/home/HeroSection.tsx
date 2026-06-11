import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { ArrowButton } from "../commons/ArrowButton";
import { CartIcon } from "../commons/icons/CartIcon";
import { CrowdSupplyIcon } from "../commons/icons/CrowdSupplyIcon";
import { DiscordIcon } from "../commons/icons/DiscordIcon";
import { DownloadIcon } from "../commons/icons/DownloadIcon";
import { Typography } from "../commons/Typography";

const TrackerCard: Component<{
  titleKey: string;
  mainImage: string;
  priceKey: string;
  orderKey?: string;
  href: string;
}> = (props) => {
  return (
    <div class="group rounded-2xl flex flex-col overflow-clip items-center gap-2 sm:gap-4 justify-between bg-background-60/40 border backdrop-blur-[9px] border-background-30/80">
      <A
        class="px-6 pt-6 flex flex-col gap-2 sm:gap-4 items-center justify-between w-full"
        href={props.href}
        aria-label="Card linking to SlimeVR tracker order page"
      >
        <Typography
          tag="h1"
          textAlign="text-center"
          key={props.titleKey}
          class="text-[24px] lg:text-[28px] xl:text-[32px] font-bold"
        />
        <div class="relative h-30 md:h-40 w-full flex justify-center items-center">
          <img
            src="/images/purple_glow.webp"
            class="absolute object-contain h-full scale-200 blur-2xl no-interact"
            fetchpriority="high"
            alt=""
          />
          <img
            src="/images/tracker_card_border.webp"
            class="absolute object-contain h-full scale-[90%] group-hover:rotate-1 transition-transform duration-500 no-interact"
            fetchpriority="high"
            alt=""
          />
          <img
            src={props.mainImage}
            class="absolute object-contain h-full top-2 blur-[3px] group-hover:-rotate-3 transition-transform no-interact"
            alt=""
          />
          <img
            src={props.mainImage}
            class="absolute object-contain h-full top-2 group-hover:-rotate-3 transition-transform no-interact"
            fetchpriority="high"
            alt="SlimeVR tracker image"
          />
        </div>
        <Typography
          key={props.priceKey}
          tag="p"
          class="text-[20px] lg:text-[24px] xl:text-[28px] font-bold"
        />
      </A>

      {/* regular version of order button */}
      <div class="w-full px-6 pb-6 hidden 2xl:block">
        <ArrowButton
          variant="primary"
          prefixIcon={<CartIcon size={36}></CartIcon>}
          href={props.href}
        >
          <div class="flex flex-col flex-wrap relative justify-center pb-2">
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
      <div class="w-full md:px-6 md:pb-6 px-4 pb-4 block 2xl:hidden">
        <ArrowButton
          variant="primary"
          prefixIcon={<CartIcon size={30}></CartIcon>}
          href={props.href}
        >
          <div class="flex flex-col flex-wrap relative justify-center pb-2">
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
    <div class="flex flex-col h-full sm:h-220 justify-between items-center my-8 relative">
      <div class="hidden w-full md:flex flex-col gap-8 items-center">
        <Typography
          tag="h1"
          key="home.hero.description"
          textAlign="text-center"
          class="text-[40px] font-bold"
        />
        {/* desktop hero */}
        <div class="grid-cols-3 w-full gap-4 md:gap-8 lg:gap-12 hidden md:grid">
          <TrackerCard
            titleKey="home.hero.butterfly-slime"
            mainImage="/images/butterfly_dock.webp"
            priceKey="home.hero.price-butterfly"
            orderKey="home.hero.preorder-btn"
            href="https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers"
          />
          <div></div>
          <TrackerCard
            titleKey="home.hero.og-slime"
            mainImage="/images/og_slime.webp"
            priceKey="home.hero.price"
            orderKey="home.hero.order-btn"
            href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
          />
        </div>
      </div>
      {/* mobile hero */}
      <div class="grid grid-cols-1 w-full gap-4 md:hidden">
        <Typography
          tag="h1"
          key="home.hero.description"
          textAlign="text-center"
          class="text-[1.75rem] -mt-4 font-bold"
        />
        <TrackerCard
          titleKey="home.hero.butterfly-slime"
          mainImage="/images/butterfly_dock.webp"
          priceKey="home.hero.price-butterfly"
          orderKey="home.hero.preorder-btn"
          href="https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers"
        />
        <TrackerCard
          titleKey="home.hero.og-slime"
          mainImage="/images/og_slime.webp"
          priceKey="home.hero.price"
          orderKey="home.hero.order-btn"
          href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
        />
      </div>

      {/* nighty showing trackers bg */}
      <div class="hidden flex-col justify-between items-center no-interact md:flex">
        {/* nighty */}
        <div class="absolute w-full h-full top-0 left-0">
          <img
            src="/images/nighty_floating.webp"
            class="absolute -z-10 scale-[150%] md:mt-90 mt-40 md:animate-floating blur-lg min-w-280 left-1/2 -translate-x-[55%] md:-translate-x-1/2"
            alt="Nightly floating in the background"
          ></img>
          <img
            src="/images/nighty_floating.webp"
            class="absolute -z-10 scale-[150%] md:mt-90 mt-40 md:animate-floating min-w-280 left-1/2 -translate-x-[55%] md:-translate-x-1/2 brightness-75 md:brightness-100"
            alt=""
          ></img>
          <img
            src="/images/stars.webp"
            class="absolute -z-10 scale-[135%] md:mt-80 mt-40 md:animate-stars"
            alt=""
          ></img>
        </div>

        {/* tracker */}
        <div class="absolute mid:top-14 md:top-40 lg:top-30 top-12 w-100 lg:w-110 2xl:w-130 no-interact hidden md:block">
          <img
            src="/images/purple_glow.webp"
            class="w-full scale-120 absolute top-0 -z-10"
            alt=""
          ></img>
          <img
            src="/images/butterfly_tracker.webp"
            class="w-full animate-rotated"
            alt="SlimeVR Butterfly Tracker floating in the background"
          ></img>
          <div class="absolute w-full h-full top-20 left-0 brightness-90 animate-stars2 -z-10">
            <img src="/images/stars.webp" class="w-full" alt=""></img>
          </div>
        </div>
      </div>

      {/* CTA stuff */}
      <div class="w-full flex flex-col gap-4 items-center">
        <div class="grid md:grid-cols-2 grid-cols-1 w-full md:gap-10 gap-4">
          <div>
            <ArrowButton
              prefixIcon={<DownloadIcon size={35}></DownloadIcon>}
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("download")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <Typography
                variant="section-title"
                tag="span"
                key="home.hero.download-server.title"
              />
              <Typography tag="p" key="home.hero.download-server.desc" />
            </ArrowButton>
          </div>

          <div>
            <ArrowButton
              prefixIcon={<DiscordIcon size={40}></DiscordIcon>}
              href="https://discord.gg/SlimeVR"
            >
              <Typography
                variant="section-title"
                tag="span"
                key="home.hero.join-discord.title"
              />
              <Typography tag="p" key="home.hero.join-discord.desc" />
            </ArrowButton>
          </div>
        </div>
      </div>
    </div>
  );
};
