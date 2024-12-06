import { Component, createSignal } from "solid-js";
import { Typography } from "../../components/commons/Typogrtaphy";
import { Button } from "../../components/commons/Button";
import { DiscordIcon } from "../../components/commons/icons/DiscordIcon";
import { ArrowIcon } from "../../components/commons/icons/ArrowIcon";
import { DonwloadIcon } from "../../components/commons/icons/DownloadIcon";
import { MouserIcon } from "../../components/commons/icons/MouserIcon";
import { CrowdSupplyIcon } from "../../components/commons/icons/CrowdSupplyIcon";
import { ArrowButton } from "../../components/commons/ArrowButton";
import { QASection } from "./QASection";
import { VideoSection } from "./VideoSection";
import { Section } from "../../components/Section";
import { AppTitle } from "../../components/AppTitle";

const Home: Component = (props) => {
  return (
    <>
      <AppTitle>SlimeVR Full Body Trackers</AppTitle>
      <Section>
        <div class="flex flex-col items-center w-full gap-4">
          <div class="rounded-2xl w-full bg-background-60 overflow-clip mt-5 grid grid-cols-1 md:grid-cols-2 gap-1 md:h-[800px]">
            <div class="flex flex-col gap-4 relative overflow-clip">
              <div class="p-4 md:p-12 z-10 gap-4 md:gap-10 justify-between h-full flex flex-col bg-accent-background-30">
                <Typography variant="main-title" tag="h1">
                  SlimeVR Full-Body Tracker
                </Typography>
                <img src="/images/trackers.webp"></img>
                <Typography variant="section-title" tag="h2">
                  An affordable, comfortable, wireless, 360° solution for
                  full-body tracking in virtual reality
                </Typography>
                <div class="z-10 flex flex-col gap-5 h-full justify-end">
                  {/* <ArrowButton>
                    <div class="flex flex-wrap gap-3 items-center  md:h-16 p-2">
                      <Typography
                        variant="section-title"
                        tag="h3"
                        whitespace="whitespace-nowrap"
                      >
                        Order on
                      </Typography>
                      <MouserIcon size={120}></MouserIcon>
                    </div>
                  </ArrowButton> */}
                  <ArrowButton>
                    <div class="flex flex-col flex-wrap gap-3 p-4">
                      <Typography
                        variant="section-title"
                        tag="h3"
                        whitespace="whitespace-nowrap"
                      >
                        Order on
                      </Typography>
                      <CrowdSupplyIcon size={200}></CrowdSupplyIcon>
                    </div>
                  </ArrowButton>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-3 relative bg-accent-background-30">
              <img
                class="absolute w-full h-full object-cover"
                src="/images/poster.webp"
              ></img>

              <div class="z-10 flex flex-col gap-5 p-4 md:p-12 h-full justify-end">
                <ArrowButton
                  prefixIcon={<DonwloadIcon size={35}></DonwloadIcon>}
                >
                  <Typography variant="section-title" tag="h3">
                    Download the server
                  </Typography>
                  <Typography tag="p">Available on all platforms!</Typography>
                </ArrowButton>
                <ArrowButton prefixIcon={<DiscordIcon size={40}></DiscordIcon>}>
                  <Typography variant="section-title" tag="h3">
                    Join our Discord
                  </Typography>
                  <Typography tag="p">With 50.000 members</Typography>
                </ArrowButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div class="flex flex-col pt-10 md:pt-20 gap-10 md:gap-20 w-full items-center">
        <Section gizmo="/images/Webpage_Design_Parts_first_block_bg.webp">
          <VideoSection></VideoSection>
        </Section>

        <Section>
          <div class="flex flex-col items-center gap-4">
            <Typography tag="h3" variant="main-title">
              Use cases
            </Typography>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 flex flex-col gap-4 justify-between">
                <Typography
                  tag="h4"
                  variant="main-title"
                  textAlign="text-center"
                >
                  VR Games
                </Typography>
                <div class="flex justify-center items-center h-52 md:h-auto">
                  <img src="/images/vr.webp" class="h-full" />
                </div>
                <Typography tag="p" textAlign="text-justify">
                  SlimeVR Trackers are compatible with any SteamVR games that
                  suport full body tracking. That includes social games like
                  VRChat or Neos
                </Typography>
                <Button variant="tertiary" href="/#VR">
                  See more
                </Button>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 flex flex-col gap-4 justify-between">
                <Typography
                  tag="h4"
                  variant="main-title"
                  textAlign="text-center"
                >
                  VTubing
                </Typography>
                <div class="flex justify-center items-center h-52 md:h-auto">
                  <img src="/images/vtubing.webp" class="h-full" />
                </div>
                <Typography tag="p" textAlign="text-justify">
                  SlimeVR Trackers also work with VMC. No VR headset required!
                </Typography>
                <Button variant="tertiary">See more</Button>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 flex flex-col gap-4 justify-between">
                <Typography
                  tag="h4"
                  variant="main-title"
                  textAlign="text-center"
                >
                  Motion Capture
                </Typography>
                <div class="flex justify-center items-center h-52 md:h-auto">
                  <img src="/images/mocap.webp" class="h-full" />
                </div>
                <Typography tag="p" textAlign="text-justify">
                  SlimeVR can be used to export Motion Capture data via the BVH
                  file format. This allows for your tracking data to be imported
                  inside 3d rendering software like Blender
                </Typography>
                <Button variant="tertiary">See more</Button>
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
