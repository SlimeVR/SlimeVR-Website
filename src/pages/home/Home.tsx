import { Component, createSignal, onCleanup, onMount } from "solid-js";
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
import { ArrowIcon } from "../../components/commons/icons/ArrowIcon";
import { MouserIcon } from "../../components/commons/icons/MouserIcon";
import { CartIcon } from "../../components/commons/icons/CartIcon";

const Home: Component = (props) => {
  return (
    <>
      <AppTitle>SlimeVR Full Body Trackers</AppTitle>
      <Section>
        <div class="flex w-full mt-5 relative">
          <div class="absolute top-0 h-full animate-floating right-0 hidden md:block">
            <img
              src="/images/floating_nighty.webp"
              class="h-full object-contain"
            ></img>
          </div>
          <div class="w-full grid grid-cols-1 md:grid-cols-2 sm:gap-4 md:h-[750px]">
            <div class="z-10 h-full flex gap-4 flex-col relative justify-between py-5 px-0 sm:px-5">
              <div class="z-10 flex flex-col gap-5 h-full justify-between relative">
                <Typography variant="main-title" tag="p">
                  An affordable, comfortable, wireless, 360° solution for
                  full-body tracking in virtual reality
                </Typography>

                <img
                  src="/images/SlimePCB3.webp"
                  class="w-full object-cover"
                ></img>
                <ArrowButton
                  variant="primary"
                  prefixIcon={<CartIcon size={60}></CartIcon>}
                >
                  <div class="flex flex-col flex-wrap relative justify-center pb-2">
                    <div
                      class="absolute -top-12 sm:-top-14 -left-6 sm:-left-[6.8rem] w-fit rotate-[-10deg] text-2xl sm:text-4xl p-1 rounded-md shadow-lg shadow-accent-background-40 font-bold bg-accent-background-20"
                      style={{
                        "box-shadow":
                          "#4e0097 0.5rem 0.5rem, rgb(241 241 241) -0.5rem -0.5rem",
                      }}
                    >
                      From $195
                    </div>
                    <Typography
                      variant="main-title"
                      tag="h3"
                      whitespace="whitespace-nowrap"
                    >
                      Order on
                    </Typography>
                    <CrowdSupplyIcon size={256}></CrowdSupplyIcon>
                  </div>
                </ArrowButton>
              </div>
            </div>
            <div class="flex flex-col gap-3 z-10 py-5 px-0 sm:px-5 h-full justify-end">
              <ArrowButton prefixIcon={<DonwloadIcon size={35}></DonwloadIcon>}>
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
        {/* <div class="h-[750px] w-full flex flex-col relative justify-end">
          <div class="absolute top-0 h-full animate-floating right-0">
            <img
              src="/images/floating_nighty.webp"
              class="h-full object-contain"
            ></img>
          </div>
          <div class="absolute top-40 h-full animate-floating left-0">
            <img
              src="https://media.discordapp.net/attachments/1069233272753758268/1314556183343796295/image.png?ex=67577f19&is=67562d99&hm=ffb62cec2075fff36571b731af485d8de113c3777ec4e2b7a5d9572a629660dc&=&format=webp&quality=lossless&width=1765&height=993"
              class="w-[600px] object-contain"
            ></img>
          </div>
          <div class="flex h-40 opacity-80 w-full rounded-2xl bg-background-70 border border-background-40 z-10 p-4 ">
            <div class="grid grid-cols-2 w-full divide-background-40 divide-x-2 gap-3">
              <div class="flex items-center justify-start gap-8 px-4">
                <ArrowIcon
                  class="fill-background-10"
                  size={30}
                  direction="left"
                ></ArrowIcon>
                <Typography variant="main-title" tag="h3">
                  Download the server
                </Typography>
              </div>
              <div class="flex items-center justify-end  gap-8  px-4">
                <div class="flex gap-2 items-center">
                  <Typography
                    variant="main-title"
                    tag="h3"
                    whitespace="whitespace-nowrap"
                  >
                    Order on
                  </Typography>
                  <CrowdSupplyIcon size={200}></CrowdSupplyIcon>
                </div>
                <ArrowIcon
                  class="fill-background-10"
                  size={30}
                  direction="right"
                ></ArrowIcon>
              </div>
            </div>
          </div>
        </div> */}
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
