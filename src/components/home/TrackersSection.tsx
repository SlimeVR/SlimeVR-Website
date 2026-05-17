import { A } from "@solidjs/router";
import { ArrowButton } from "../commons/ArrowButton";
import { CartIcon } from "../commons/icons/CartIcon";
import { CrowdSupplyIcon } from "../commons/icons/CrowdSupplyIcon";
import { Typography } from "../commons/Typography";

export const TrackersSection = () => {
  return (
      <div class="grid gap-10 relative rounded-3xl md:grid-cols-2">
        <div class="group rounded-2xl w-full flex flex-col overflow-clip items-center gap-2 sm:gap-4 justify-between bg-background-60/40 border backdrop-blur-[9px] border-background-30/80">
          <A
            class="px-12 pt-8 flex flex-col items-center w-full"
            href="https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers"
          >
            <Typography
              variant="main-title"
              tag="h3"
              textAlign="text-center"
              key="home.hero.butterfly-slime"
            ></Typography>
            <div class="relative h-60 md:h-80 w-full flex justify-center">
              <img
                src="/images/purple_glow.webp"
                loading="lazy"
                class="absolute object-contain h-full scale-200 blur-2xl pointer-events-none"
              ></img>
              <img
                src="/images/tracker_card_border.webp"
                loading="lazy"
                class="absolute object-contain h-full -top-5 scale-[90%] group-hover:rotate-1 transition-transform duration-500 pointer-events-none"
              ></img>
              <img
                src="/images/butterfly_dock.webp"
                loading="lazy"
                class="absolute object-contain h-full blur-[3px] group-hover:-rotate-3 transition-transform pointer-events-none"
              ></img>
              <img
                src="/images/butterfly_dock.webp"
                loading="lazy"
                class="absolute object-contain h-full group-hover:-rotate-3 transition-transform pointer-events-none"
              ></img>
            </div>
            <Typography
              key="home.hero.price-butterfly"
              tag="p"
              variant="main-title"
            ></Typography>
          </A>
          <div class="w-full px-8 pb-8">
            <ArrowButton
              variant="primary"
              prefixIcon={<CartIcon size={40}></CartIcon>}
              href="https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers"
            >
              <div class="flex flex-col flex-wrap relative justify-center pb-2">
                <Typography
                  variant="section-title"
                  tag="span"
                  whitespace="whitespace-nowrap"
                  key="home.hero.preorder-btn"
                />
                <CrowdSupplyIcon size={180}></CrowdSupplyIcon>
              </div>
            </ArrowButton>
          </div>
        </div>
        <div class="group rounded-2xl w-full flex flex-col overflow-clip items-center gap-2 sm:gap-4 justify-between bg-background-60/40 border backdrop-blur-[9px] border-background-30/80">
          <A
            class="px-8 pt-8 flex flex-col items-center w-full"
            href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
          >
            <Typography
              variant="main-title"
              tag="h3"
              textAlign="text-center"
              key="home.hero.og-slime"
            ></Typography>
            <div class="relative h-60 md:h-80 w-full flex justify-center">
              <img
                src="/images/purple_glow.webp"
                loading="lazy"
                class="absolute object-contain h-full scale-200 blur-2xl pointer-events-none"
              ></img>
              <img
                src="/images/tracker_card_border.webp"
                loading="lazy"
                class="absolute object-contain h-full -top-5 scale-[90%] group-hover:rotate-1 transition-transform duration-500 pointer-events-none"
              ></img>
              <img
                src="/images/og_slime.webp"
                loading="lazy"
                class="absolute object-contain h-full blur-[3px] group-hover:-rotate-3 transition-transform pointer-events-none"
              ></img>
              <img
                src="/images/og_slime.webp"
                loading="lazy"
                class="absolute object-contain h-full group-hover:-rotate-3 transition-transform pointer-events-none"
              ></img>
            </div>
            <Typography
              key="home.hero.price"
              tag="p"
              variant="main-title"
            ></Typography>
          </A>
          <div class="w-full px-8 pb-8">
            <ArrowButton
              variant="primary"
              prefixIcon={<CartIcon size={40}></CartIcon>}
              href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
            >
              <div class="flex flex-col flex-wrap relative justify-center pb-2">
                <Typography
                  variant="section-title"
                  tag="span"
                  whitespace="whitespace-nowrap"
                  key="home.hero.order-btn"
                />
                <CrowdSupplyIcon size={180}></CrowdSupplyIcon>
              </div>
            </ArrowButton>
          </div>
        </div>
      </div>
  );
};
