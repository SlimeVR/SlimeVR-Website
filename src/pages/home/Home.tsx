import { Component } from "solid-js";
import { Typography } from "../../components/commons/Typogrtaphy";
import { Button } from "../../components/commons/Button";
import { DiscordIcon } from "../../components/commons/icons/DiscordIcon";
import { DonwloadIcon } from "../../components/commons/icons/DownloadIcon";
import { CrowdSupplyIcon } from "../../components/commons/icons/CrowdSupplyIcon";
import { ArrowButton } from "../../components/commons/ArrowButton";
import { QASection } from "./QASection";
import { VideoSection } from "./VideoSection";
import { Section } from "../../components/Section";
import { AppTitle } from "../../components/AppTitle";
import { CartIcon } from "../../components/commons/icons/CartIcon";
import { Localized } from "@llelievr.dev/solid-fluent";
import { DownloadSection } from "./DownloadSection";
import { Link } from "@solidjs/meta";

const Home: Component = (props) => {
  return (
    <>
      <AppTitle key="home_title"></AppTitle>
      <Link rel="canonical" href="https:/slimevr.dev/" />
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
                  tag="p"
                  key="hero_description"
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
                      <Localized id="hero_price" />
                    </div>
                    <Typography
                      variant="main-title"
                      tag="h3"
                      whitespace="whitespace-nowrap"
                      key="hero_order-btn"
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
                  tag="h3"
                  key="hero_download-server"
                />
                <Typography tag="p" key="hero_download-server_desc" />
              </ArrowButton>
              <ArrowButton
                prefixIcon={<DiscordIcon size={40}></DiscordIcon>}
                href="https://discord.gg/SlimeVR"
              >
                <Typography
                  variant="section-title"
                  tag="h3"
                  key="hero_join-discord"
                />
                <Typography tag="p" key="hero_join-discord_desc" />
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
              tag="h3"
              variant="main-title"
              key="home_use-cases_title"
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 flex flex-col gap-4 justify-between">
                <Typography
                  tag="h4"
                  variant="main-title"
                  textAlign="text-center"
                  key="home_use-cases_vr_title"
                />
                <div class="flex justify-center items-center h-52 md:h-auto select-none pointer-events-none">
                  <img src="/images/vr.webp" class="h-full" />
                </div>
                <Typography
                  tag="p"
                  textAlign="text-justify"
                  key="home_use-cases_vr_desc"
                />
                {/* <Button variant="tertiary" href="/#VR">
                  See more
                </Button> */}
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 flex flex-col gap-4 justify-between">
                <Typography
                  tag="h4"
                  variant="main-title"
                  textAlign="text-center"
                  key="home_use-cases_vtubing_title"
                />
                <div class="flex justify-center items-center h-52 md:h-auto select-none pointer-events-none">
                  <img src="/images/vtubing.webp" class="h-full" />
                </div>
                <Typography
                  tag="p"
                  textAlign="text-justify"
                  key="home_use-cases_vtubing_desc"
                />
                {/* <Button variant="tertiary">See more</Button> */}
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 flex flex-col gap-4 justify-between">
                <Typography
                  tag="h4"
                  variant="main-title"
                  textAlign="text-center"
                  key="home_use-cases_motion-capture_title"
                />
                <div class="flex justify-center items-center h-52 md:h-auto select-none pointer-events-none">
                  <img src="/images/mocap.webp" class="h-full" />
                </div>
                <Typography
                  tag="p"
                  textAlign="text-justify"
                  key="home_use-cases_motion-capture_desc"
                />
                {/* <Button variant="tertiary">See more</Button> */}
              </div>
            </div>
          </div>
        </Section>

        <Section gizmo="/images/Webpage_Design_Parts_second_block_bg.webp">
          <QASection></QASection>
        </Section>
      </div>
    </>
  );
};

export default Home;
