import { Component, For, ParentComponent } from "solid-js";
import { Container, Typography } from "~/components/commons";
import { Drawer, DrawerItem } from "~/components/commons/Drawer";

const mediaGalleryContents: {
    Category: string;
    Images: string[];
}[] = [
  {
    Category: "SlimeVR Logos",
    Images: [
      "images/press-kit/logos/SlimeVR/SlimeVR logo and text on background_462x174.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo icon on background_600x600.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo transparent background_98x55.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo transparent with text_583x440.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo with one SlimeVR mascot_920x430.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo with three SlimeVR mascots_1232x706.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo with two SlimeVR mascots_920x430.png",
    ],
  },
  {
    Category: "Butterfly Tracker Logo",
    Images: [
      "images/press-kit/logos/Butterfly/Butterfly Trackers Logo_2480x2815.png",
    ],
  },
  {
    Category: "Product Shots",
    Images: [
      "images/press-kit/product-shots/SlimeVR Wi-Fi tracker with Ibis 2.0 nrf diy tracker for comparison_1647x856.webp",
      "images/press-kit/product-shots/SlimeVR Wi-Fi Trackers_1599x620.jpg",
    ],
  },
];

export const PressKitMediaGallery: Component = () => {
  <Container class="flex flex-col gap-4">
    asd
    <Typography tag="h2" variant="main-title">
      Whatever
    </Typography>
    <Drawer>
      <DrawerItem title="asd">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <For
            each={[
              `images/press-kit/logos/SlimeVR/SlimeVR logo and text on background_462x174.png`,
            ]}
          >
            {(file) => <img src={file} loading="lazy" class="w-full h-auto" />}
          </For>
        </div>
      </DrawerItem>
    </Drawer>
  </Container>;
};
