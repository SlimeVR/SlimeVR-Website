import { Link, Meta } from "@solidjs/meta";
import { Component, ParentProps } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { CartIcon } from "~/components/commons/icons/CartIcon";
import { CrowdSupplyIcon } from "~/components/commons/icons/CrowdSupplyIcon";
import { DiscordIcon } from "~/components/commons/icons/DiscordIcon";
import { DonwloadIcon } from "~/components/commons/icons/DownloadIcon";
import { Typography } from "~/components/commons/Typography";
import { DownloadSection } from "~/components/home/DownloadSection";
import { QASection } from "~/components/home/QASection";
import { VideoSection } from "~/components/home/VideoSection";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";

const UseCaseCard: Component<{ title: string; image: string; desc: string }> = (
  props
) => {
  return (
    <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
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
    </div>
  );
};

export default function HomeLayout(props: ParentProps) {
  return (
    <MainLayout>
      <AppTitle key="home.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/" />
      <Section>
        <div class="flex w-full mt-5 relative">
          <div class="absolute top-0 h-full animate-floating right-0 w-full md:flex justify-end hidden">
            <img
              src="/images/floating_nighty.webp"
              loading="lazy"
              class="h-full object-contain"
            ></img>
          </div>
          <div class="w-full grid grid-cols-1 md:grid-cols-2 sm:gap-4 md:h-[750px]">
            <div class="z-10 h-full flex gap-4 flex-col relative justify-between py-5 px-0 sm:px-5">
              <div class="z-10 flex flex-col gap-5 h-full justify-between relative">
                <Typography
                  variant="main-title"
                  tag="h1"
                  key="home.hero.description"
                />
                <div class="aspect-video px-12 pointer-events-none select-none">
                  <img
                    src="/images/SlimePCB3.webp"
                    loading="lazy"
                    class="w-full"
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
            </div>
            <div class="flex flex-col gap-3 z-10 py-5 px-0 sm:px-5 h-full justify-end">
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
        <Section gizmo="/images/Webpage_Design_Parts_first_block_bg.webp">
          <VideoSection></VideoSection>
        </Section>

        <Section>
          <DownloadSection></DownloadSection>
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
