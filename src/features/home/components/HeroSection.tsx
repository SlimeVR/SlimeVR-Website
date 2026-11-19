import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { CartIcon } from "../../../components/commons/icons/CartIcon";
import { CrowdSupplyIcon } from "../../../components/commons/icons/CrowdSupplyIcon";
import { DiscordIcon } from "../../../components/commons/icons/DiscordIcon";
import { DownloadIcon } from "../../../components/commons/icons/DownloadIcon";
import { scrollToSection } from "~/utils/dom";
import { Typography, ArrowButton } from "~/components/commons";
import clsx from "clsx";

const ProductCard: Component<{
  titleKey: string;
  mainImage: string;
  priceKey: string;
  orderKey: string;
  href: string;
  imgClass?: string;
}> = (props) => {
  return (
    <div class="group bg-background-60/40 border-background-40 flex flex-col items-center justify-between gap-2 overflow-clip rounded-2xl border backdrop-blur-[9px] sm:gap-4">
      {/* images */}
      <A
        class="flex w-full flex-col items-center justify-between gap-2 px-6 pt-6 sm:gap-4"
        href={props.href}
        aria-label="Card linking to SlimeVR tracker order page"
      >
        <Typography
          tag="h1"
          textAlign="text-center"
          key={props.titleKey}
          class="text-[24px] font-bold lg:text-[28px] xl:text-[32px]"
        />
        <div class="relative flex h-30 w-full items-center justify-center md:h-40">
          <img
            src="/images/purple_glow.webp"
            class="no-interact absolute h-full scale-200 object-contain blur-2xl"
            fetchpriority="high"
            alt=""
          />
          <img
            src="/images/product_card_border.webp"
            class="no-interact absolute h-full scale-[90%] object-contain transition-transform duration-500 group-hover:rotate-1"
            fetchpriority="high"
            alt=""
          />
          <img
            src={props.mainImage}
            class={clsx(
              `no-interact absolute h-full object-contain blur-[3px] transition-transform group-hover:-rotate-3`,
              props.imgClass
            )}
            alt=""
          />
          <img
            src={props.mainImage}
            class={clsx(
              "no-interact absolute h-full object-contain transition-transform group-hover:-rotate-3",
              props.imgClass
            )}
            fetchpriority="high"
            alt="SlimeVR tracker image"
          />
        </div>
        <Typography
          key={props.priceKey}
          tag="p"
          class="text-[20px] font-bold lg:text-[24px] xl:text-[28px]"
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
              key={props.orderKey}
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
              key={props.orderKey}
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
    <div class="relative my-8 flex h-full flex-col items-center justify-between sm:h-220">
      <div class="hidden w-full flex-col items-center gap-8 md:flex">
        <Typography
          tag="h1"
          key="home.hero.description"
          textAlign="text-center"
          class="text-[40px] font-bold"
        />
        {/* desktop hero */}
        <div class="hidden w-full grid-cols-3 gap-4 md:grid md:gap-8 lg:gap-12">
          <ProductCard
            titleKey="home.hero.butterfly.name"
            mainImage="/images/butterfly_dock.webp"
            priceKey="home.hero.butterfly.price"
            orderKey="home.hero.butterfly.order"
            href="https://slime.gay/site-cs-bf"
            imgClass="top-2"
          />
          <div></div>
          <ProductCard
            titleKey="home.hero.nighty.name"
            mainImage="/images/nighty_plushie.webp"
            priceKey="home.hero.nighty.price"
            orderKey="home.hero.nighty.order"
            href="https://slime.gay/site-cs-bf#products"
          />
        </div>
      </div>
      {/* mobile hero */}
      <div class="grid w-full grid-cols-1 gap-4 md:hidden">
        <Typography
          tag="h1"
          key="home.hero.description"
          textAlign="text-center"
          class="-mt-4 text-[1.75rem] font-bold"
        />
        <ProductCard
          titleKey="home.hero.butterfly.name"
          mainImage="/images/butterfly_dock.webp"
          priceKey="home.hero.butterfly.price"
          orderKey="home.hero.butterfly.order"
          href="https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers"
          imgClass="top-2"
        />
        <ProductCard
          titleKey="home.hero.nighty.name"
          mainImage="/images/nighty_plushie.webp"
          priceKey="home.hero.nighty.price"
          orderKey="home.hero.nighty.order"
          href="https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers#products"
        />
      </div>

      {/* nighty showing trackers bg */}
      <div class="no-interact hidden flex-col items-center justify-between md:flex">
        {/* nighty */}
        <div class="pointer-events-none absolute top-0 left-0 h-full w-full">
          <img
            src="/images/nighty_floating.webp"
            class="md:animate-floating absolute left-1/2 -z-10 mt-40 min-w-280 translate-x-[-55%] scale-[150%] blur-lg md:mt-90 md:-translate-x-1/2"
            alt="Nightly floating in the background"
          ></img>
          <img
            src="/images/nighty_floating.webp"
            class="md:animate-floating absolute left-1/2 -z-10 mt-40 min-w-280 translate-x-[-55%] scale-[150%] brightness-75 md:mt-90 md:-translate-x-1/2 md:brightness-100"
            alt=""
          ></img>
          <img
            src="/images/stars.webp"
            class="md:animate-stars absolute -z-10 mt-40 scale-[135%] md:mt-80"
            alt=""
          ></img>
        </div>

        {/* tracker */}
        <div class="mid:top-14 no-interact absolute top-12 hidden w-100 md:top-40 md:block lg:top-30 lg:w-110 2xl:w-130">
          <img
            src="/images/purple_glow.webp"
            class="absolute top-0 -z-10 w-full scale-120"
            alt=""
          ></img>
          <img
            src="/images/butterfly_tracker.webp"
            class="animate-rotated w-full"
            alt="SlimeVR Butterfly Tracker floating in the background"
          ></img>
          <div class="animate-stars2 absolute top-20 left-0 -z-10 h-full w-full brightness-90">
            <img src="/images/stars.webp" class="w-full" alt=""></img>
          </div>
        </div>
      </div>

      {/* CTA stuff */}
      <div class="flex w-full flex-col items-center gap-4">
        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
          <div>
            <ArrowButton
              prefixIcon={<DownloadIcon size={35}></DownloadIcon>}
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("download", location.pathname);
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
