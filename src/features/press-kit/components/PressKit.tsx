import { Component, JSX } from "solid-js";
import { Container, ExternalLink, Typography } from "~/components/commons";
import { PressKitMediaGallery } from "./PressKitMediaGallery";
import { PressKitSection } from "./PressKitSection";
import { PressKitBulletList } from "./PressKitBulletList";
import { PressKitTimelineSection } from "./PressKitTimelineSection";

export interface PressKitBulletListProps {
  items: JSX.Element[];
}

export const PressKit: Component = () => {
  return (
    <>
      <Typography
        tag="h1"
        variant="main-title"
        textAlign="text-center"
        class="mt-10 mb-6"
      >
        Press Kit
      </Typography>
      <Container class="flex flex-col mt-4">
        <AboutUsSection />
        <PressKitMediaGallery />
        <SlimeVrEcosystemSection />
        <KeyValuePropsSection />
        <PressKitTimelineSection />
        <CommunitySection />
        <HowToTalkAboutUsSection />
        <NameUsageSection />
        <ContactsSection />
      </Container>
    </>
  );
};

const AboutUsSection: Component = () => (
  <PressKitSection title="About Us">
    <Typography tag="h3" variant="section-title">
      About SlimeVR (Short)
    </Typography>
    <PressKitBulletList
      items={[
        <>
          The SlimeVR ecosystem is a set consisting of open hardware sensors and
          an open-source server that facilitates{" "}
          <ExternalLink href="https://wiki.vrchat.com/wiki/Full-Body_Tracking">
            Full-Body Tracking (FBT)
          </ExternalLink>
        </>,
        "It is designed to be affordable, comfortable, and completely open, requiring no base stations or cameras",
        "SlimeVR is commonly used for virtual reality, VTubing, and motion capture",
      ]}
    />

    <Typography tag="h3" variant="section-title">
      About SlimeVR (Long)
    </Typography>

    <Typography tag="p">
      The SlimeVR ecosystem consists of a set of trackers and server software
      that let users track their body movements and pose; from the torso and
      hips, to the fingers and toes.
    </Typography>
    <Typography tag="p">
      This lets user bring their real-life movements into VR, do VTubing, and
      perform motion capture.
    </Typography>
    <Typography tag="p">
      SlimeVR trackers are based on IMUs which do not require base stations or
      cameras, completely avoiding occlusion issues - you can use them under
      comfort of blanket!
    </Typography>
    <Typography tag="p" bold>
      Applications:
    </Typography>
    <PressKitBulletList
      items={[
        <>
          <strong>Games</strong> that supports FBT via SteamVR, OSC, or VMC are
          compatible with SlimeVR: VRChat, NeosVR, Blade and Sorcery, Dance
          Dash, Zenith: Nexus, Chillout VR, Resonite, LIV and many others!
        </>,
        <>
          <strong>VTubing</strong> software that supports OSC, VMC protocols, or
          SteamVR support SlimeVR, including VSeeFace, Warudo, Tracking Worlds,
          and many more!
        </>,
        <>
          <strong>Motion Capture (MoCap)</strong> software that can import BVH
          files, or works with OSC, VMC protocols, and SteamVR, including
          Blender, Unreal Engine, and more!
        </>,
      ]}
    />
  </PressKitSection>
);

const SlimeVrEcosystemSection: Component = () => (
  <PressKitSection title="SlimeVR Ecosystem">
    <Typography tag="h3" variant="section-title">
      SlimeVR Trackers
    </Typography>
    <PressKitBulletList
      items={[
        "The first generation of SlimeVR trackers were based on the ESP-32, using Wi-Fi",
        <>
          The next generation, Butterfly Trackers, are the official version of
          the <strong>"Smol trackers"</strong>
        </>,
        "Both generations of official trackers can be ordered through Crowd Supply, but can also be built yourself (DIY) or bought from the community marketplace in the SlimeVR Discord.",
      ]}
    />
    <hr />
    <Typography tag="p">
      <strong>Smol trackers</strong> - implementation of SlimeVR server
      compatible trackers based within the nRF ecosystem, using a proprietary
      Enhanced ShockBurst (ESB) protocol.
    </Typography>
    <Typography tag="h3" variant="section-title">
      SlimeVR Server
    </Typography>
    <Typography tag="p">
      The server app for the SlimeVR ecosystem. The server orchestrates
      communication between multiple sensors and integrations.
    </Typography>
  </PressKitSection>
);

const KeyValuePropsSection: Component = () => (
  <PressKitSection title="Community">
    <Typography tag="p">
      The open-source and DIY community spirit is essential to the experience we
      offer with SlimeVR, which is why one of our most important resources is
      the SlimeVR Discord server. It provides a valuable place for our users to
      not only turn to for help and guidance, but also develop their own SlimeVR
      tracker designs, implementations, software integrations, and more
    </Typography>
  </PressKitSection>
);

const CommunitySection: Component = () => (
  <PressKitSection title="Key Value Props">
    <PressKitBulletList
      items={[
        "Full-body tracking from the torso, arms, and legs-down, to fingers and toes - it's an entire full-body tracking system",
        "Tracking that you can build yourself for affordible prices",
        "Works great with blankets - no occlusion!",
        "SlimeVR Server automatically detects your VRChat settings and suggests the best settings for your tracking",
        "A strong community on Discord",
        "Windows, MacOS, Linux, mobile, and even standalone headsets supported",
      ]}
    />
  </PressKitSection>
);

const HowToTalkAboutUsSection: Component = () => (
  <PressKitSection title="How to Talk About Us (Brand Voice Tips)">
    <PressKitBulletList
      items={[
        "Mention the most common uses: VR games (including social VR like VRChat), motion capture, and VTubing",
        "Emphasize that the project has a strong community drive, where get to contribute their thoughts and ideas, even manufacturing and selling their own parts and trackers",
        "Highlight that there are official trackers, a community marketplace, and the option to build your own set",
        "Mention that SlimeVR works well in small playspaces, as base stations or cameras are not needed",
        "Mention that we're community driven, open, affordable, and flexible",
      ]}
    />
  </PressKitSection>
);

const NameUsageSection: Component = () => (
  <PressKitSection title="Name Usage">
    <Typography tag="p">
      The ‘S’ and the ‘VR’ are always capitalized. Always.
    </Typography>
    <Typography tag="p">Good: SlimeVR</Typography>
    <Typography tag="h3" variant="section-title">
      For Butterfly Trackers
    </Typography>
    <Typography tag="p">Good: Butterfly Trackers</Typography>
    <Typography tag="p">
      Not good: butterfly trackers, butterfly Trackers, Butterfly trackers
    </Typography>
    <Typography tag="p">
      <ExternalLink href="https://slimevr.dev/tm/">
        More on SlimeVR trademark
      </ExternalLink>
    </Typography>
  </PressKitSection>
);

const ContactsSection: Component = () => (
  <PressKitSection title="Contacts">
    <PressKitBulletList
      items={[
        <ExternalLink href="https://discord.gg/SlimeVR">Discord</ExternalLink>,
        <ExternalLink href="https://github.com/SlimeVR">Github</ExternalLink>,
        <ExternalLink href="support@slimevr.dev">Support</ExternalLink>,
        <ExternalLink href="https://bsky.app/profile/slimevr.dev">
          Bluesky
        </ExternalLink>,
      ]}
    />
  </PressKitSection>
);
