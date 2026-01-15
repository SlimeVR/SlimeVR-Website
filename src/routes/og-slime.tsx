import { Link, Meta } from "@solidjs/meta";
import { A, useLocation } from "@solidjs/router";
import { ParentProps, createEffect } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { ArrowIcon } from "~/components/commons/icons/ArrowIcon";
import { CartIcon } from "~/components/commons/icons/CartIcon";
import { CrowdSupplyIcon } from "~/components/commons/icons/CrowdSupplyIcon";
import { DiscordIcon } from "~/components/commons/icons/DiscordIcon";
import { DonwloadIcon } from "~/components/commons/icons/DownloadIcon";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";


export default function OGSlimePage(props: ParentProps) {
  const location = useLocation();

  // scroll to a section after navigation, see Navbar.tsx
  createEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | undefined)
      ?.scrollTo;
    if (!scrollTo) return;

    requestAnimationFrame(() => {
      const el = document.getElementById(scrollTo);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  return (
    <MainLayout>
      <AppTitle key="home.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/og-slime" />
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/Webpage_Design_Parts_first_block_bg.webp"
        type="image/webp"
      />
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/butterfly_nighty.webp"
        type="image/webp"
      />
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/butterfly_tracker.webp"
        type="image/webp"
      />
      <Section>
        <div class="flex w-full mt-5 relative">
          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[850px]">
            <div class="z-10 flex flex-col gap-5 h-full justify-between relative py-5 px-0 sm:px-5">
              <div class="absolute bottom-0 animate-floating left-[-165px] w-full md:flex hidden">
                <img src="/images/butterfly1.webp" loading="lazy"></img>
              </div>

              <Typography
                variant="main-title"
                tag="h1"
                key="home.hero.description"
              />
              <div class="px-12 pointer-events-none select-none max-h-[400px] h-full">
                <img
                  src="/images/slimevr_1_2_tracker.webp"
                  loading="lazy"
                  class="h-full w-full object-contain"
                ></img>
              </div>

              <ArrowButton
                variant="primary"
                prefixIcon={<CartIcon size={60}></CartIcon>}
                href="https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"
              >
                <div class="flex flex-col flex-wrap relative justify-center pb-2">
                  <div
                    class="absolute -top-12 sm:-top-14 -left-6 sm:-left-[6.8rem] w-fit rotate-[-10deg] text-2xl sm:text-4xl p-1 rounded-md shadow-lg shadow-accent-background-40 font-bold bg-accent-background-20"
                    style={{
                      "box-shadow":
                        "#4e0097 0.5rem 0.5rem, rgb(241 241 241) -0.5rem -0.5rem",
                    }}
                  >
                    <Localized id="home.hero.price" />
                  </div>
                  <Typography
                    variant="main-title"
                    tag="span"
                    whitespace="whitespace-nowrap"
                    key="home.hero.order-btn"
                  />
                  <CrowdSupplyIcon size={256}></CrowdSupplyIcon>
                </div>
              </ArrowButton>
            </div>
            <div class="flex flex-col gap-5 h-full justify-end relative py-5 px-0 sm:px-5">
              <div class="absolute top-0 left-0 h-full animate-floating w-full md:flex justify-center hidden">
                <img
                  src="/images/floating_nighty.webp"
                  loading="lazy"
                  class="h-full object-contain scale-[140%]"
                ></img>
              </div>
              <div class="absolute bottom-[-150px] animate-floating right-[-80px] w-full md:flex justify-end hidden">
                <img
                  src="/images/butterfly3.webp"
                  loading="lazy"
                  class="rotate-45"
                ></img>
              </div>
              <div class="absolute bottom-[-10px] animate-floating right-[-150px] w-full md:flex justify-end hidden">
                <img
                  src="/images/butterfly4.webp"
                  loading="lazy"
                  class="rotate-45"
                ></img>
              </div>
              <ArrowButton
                prefixIcon={<DonwloadIcon size={35}></DonwloadIcon>}
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("download")
                    .scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <Typography
                  variant="section-title"
                  tag="span"
                  key="home.hero.download-server.title"
                />
                <Typography tag="p" key="home.hero.download-server.desc" />
              </ArrowButton>
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
      </Section>

      <div class="flex flex-col pt-10 md:pt-20 gap-10 md:gap-20 w-full items-center">
        <Section>
          <div class="grid grid-cols-3 bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 ">
            <A class="bg-background-60 rounded-lg flex flex-col p-4 group" href="/butterfly">
              <div class="flex justify-center">
                <Typography variant="section-title" tag="h3">SlimeVR Butterfly Trackers</Typography>
              </div>
              <img src="/images/butterfly_tracker.webp" class="object-contain h-full"></img>
              <div class="flex flex-col gap-2">
                <Typography tag="p" textAlign="text-justify">
                  Latest iteration of the slimevr trackers. Smaller and better in every way!
                </Typography>
                <div class="justify-end flex gap-2 fill-white group-hover:gap-4 group-hover:underline transition-all">
                  <Typography tag="span">See more</Typography>
                  <ArrowIcon direction="right" size={20}></ArrowIcon>
                </div>
              </div>
            </A>
            <A class="bg-background-60 rounded-lg flex flex-col p-4 group" href="/og-slime">
              <div class="flex justify-center">
                <Typography variant="section-title" tag="h3">SlimeVR V1.2 Trackers</Typography>
              </div>
              <img src="/images/slimevr_1_2_tracker.webp" class="object-contain h-full"></img>
              <div class="flex flex-col gap-2">
                <Typography tag="p" textAlign="text-justify">
                  Latest iteration of the slimevr trackers. Smaller and better in every way!
                </Typography>
                <div class="justify-end flex gap-2 fill-white group-hover:gap-4 group-hover:underline transition-all">
                  <Typography tag="span">See more</Typography>
                  <ArrowIcon direction="right" size={20}></ArrowIcon>
                </div>
              </div>
            </A>
            <A class="bg-background-60 rounded-lg flex flex-col p-4 group" href="https://shop.slimevr.dev" target="_blank">
              <div class="flex justify-center">
                <Typography variant="section-title" tag="h3">SlimeVR Butterfly Trackers</Typography>
              </div>
              <div class="flex justify-center items-center h-full fill-white">
              <CartIcon size={300}></CartIcon>
              </div>
              {/* <img src="/images/butterfly_tracker.webp" class="object-contain h-full"></img> */}
              <div class="flex flex-col gap-2">
                <Typography tag="p" textAlign="text-justify">
                  Latest iteration of the slimevr trackers. Smaller and better in every way!
                </Typography>
                <div class="justify-end flex gap-2 fill-white group-hover:gap-4 group-hover:underline transition-all">
                  <Typography tag="span">See more</Typography>
                  <ArrowIcon direction="right" size={20}></ArrowIcon>
                </div>
              </div>
            </A>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
}
