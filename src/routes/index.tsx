import { Link, Meta } from "@solidjs/meta";
import { A, useLocation } from "@solidjs/router";
import { Component, ParentProps, createEffect } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { Container } from "~/components/commons/Container";
import { CartIcon } from "~/components/commons/icons/CartIcon";
import { CrowdSupplyIcon } from "~/components/commons/icons/CrowdSupplyIcon";
import { DiscordIcon } from "~/components/commons/icons/DiscordIcon";
import { DonwloadIcon } from "~/components/commons/icons/DownloadIcon";
import { Typography } from "~/components/commons/Typography";
import { DownloadSection } from "~/components/home/DownloadSection";
import { QASection } from "~/components/home/QASection";
import { VideoSection } from "~/components/home/VideoSection";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";

const UseCaseCard: Component<{ title: string; image: string; desc: string }> = (
  props
) => {
  return (
    <Container class="gap-4 flex flex-col sm:flex-row md:flex-col">
      <div class="sm:hidden md:block">
        <Typography
          tag="h3"
          variant="main-title"
          textAlign="text-center"
          key={props.title}
        />
      </div>
      <div class="flex justify-center items-center sm:justify-start h-52 md:h-auto select-none pointer-events-none sm:w-fit">
        <img
          src={props.image}
          loading="lazy"
          class="h-full sm:w-full sm:h-auto sm:p-8 md:p-0"
        />
      </div>
      <div class="flex flex-col sm:gap-4 sm:justify-center sm:w-full">
        <div class="hidden sm:block md:hidden">
          <Typography
            tag="h3"
            variant="main-title"
            textAlign="text-center"
            key={props.title}
          />
        </div>
        <Typography tag="p" key={props.desc} />
      </div>
    </Container>
  );
};

export default function HomePage(props: ParentProps) {
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
      <Link rel="canonical" href="https://slimevr.dev/" />
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
        href="/images/nighty_floating.webp"
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
        <div class="flex flex-col h-150 sm:h-220 justify-between items-center my-8 relative">
          <img
            src="/images/nighty_floating.webp"
            loading="lazy"
            class="absolute -z-10 scale-[135%] sm:mt-80 mt-40 sm:animate-floating blur-lg min-w-280 sm:translate-x-0 -translate-x-10"
          ></img>
          <img
            src="/images/nighty_floating.webp"
            loading="lazy"
            class="absolute -z-10 scale-[135%] sm:mt-80 mt-40 sm:animate-floating min-w-280 sm:translate-x-0 -translate-x-10 brightness-75 sm:brightness-100"
          ></img>
          <img
            src="/images/stars.webp"
            loading="lazy"
            class="absolute -z-10 scale-[135%] mt-40 min-w-280 animate-stars"
          ></img>
          <div class="absolute mid:top-24 sm:top-32 top-12  sm:translate-x-10 w-100 sm:w-120 2xl:w-140">
            <img
              src="/images/purple_glow.webp"
              loading="lazy"
              class="w-full scale-120 absolute top-0 -z-10 "
            ></img>
            <img
              src="/images/butterfly_tracker.webp"
              loading="lazy"
              class="w-full animate-rotated"
            ></img>
            <div class="absolute w-full h-full top-20 left-0 brightness-90 animate-stars2">
              <img src="/images/stars.webp" loading="lazy" class="w-full"></img>
            </div>
          </div>
          <Typography
            variant="main-title"
            tag="h1"
            key="home.hero.description"
            textAlign="text-center"
            class="2xl:max-w-[90%]"
          />
          <div class="grid md:grid-cols-2 grid-cols-1 w-full md:gap-10 gap-4">
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
      </Section>

      <div class="flex flex-col pt-5 md:pt-5 gap-20 w-full items-center">
        <Section>
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
                >
                </Typography>
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
                    class="absolute object-contain h-full blur-[3px] scale-[140%] group-hover:-rotate-3 transition-transform pointer-events-none"
                  ></img>
                  <img
                    src="/images/butterfly_dock.webp"
                    loading="lazy"
                    class="absolute object-contain h-full scale-[140%] group-hover:-rotate-3 transition-transform pointer-events-none"
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
                >
                </Typography>
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
                    class="absolute object-contain h-full blur-[3px] sm:scale-[100%] group-hover:-rotate-3 transition-transform pointer-events-none"
                  ></img>
                  <img
                    src="/images/og_slime.webp"
                    loading="lazy"
                    class="absolute object-contain h-full scale-[100%] group-hover:-rotate-3 transition-transform pointer-events-none"
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
                      key="home.hero.preorder-btn"
                    />
                    <CrowdSupplyIcon size={180}></CrowdSupplyIcon>
                  </div>
                </ArrowButton>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <DownloadSection></DownloadSection>
        </Section>

        <Section gizmo="/images/Webpage_Design_Parts_first_block_bg.webp">
          <VideoSection></VideoSection>
        </Section>

        <Section>
          <div class="flex flex-col items-center gap-4">
            <Typography
              tag="h2"
              variant="main-title"
              key="home.use-cases.title"
            />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <UseCaseCard
                title="home.use-cases.vr.title"
                image="/images/vr.webp"
                desc="home.use-cases.vr.desc"
              ></UseCaseCard>
              <UseCaseCard
                title="home.use-cases.vtubing.title"
                image="/images/vtubing.webp"
                desc="home.use-cases.vtubing.desc"
              ></UseCaseCard>
              <UseCaseCard
                title="home.use-cases.motion-capture.title"
                image="/images/mocap.webp"
                desc="home.use-cases.motion-capture.desc"
              ></UseCaseCard>
            </div>
          </div>
        </Section>

        <Section gizmo="/images/Webpage_Design_Parts_second_block_bg.webp">
          <QASection></QASection>
        </Section>
      </div>
    </MainLayout>
  );
}
