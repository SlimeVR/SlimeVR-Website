import { Component, For, ParentComponent } from "solid-js";
import { Container, Typography } from "~/components/commons";

const mediaGalleryContents: {
  Category: string;
  Images: (
    | string
    | {
        href: string;
        label: string;
      }
  )[];
}[] = [
  {
    Category: "SlimeVR Logo",
    Images: [
      "images/press-kit/logos/SlimeVR/SlimeVR logo transparent with text_583x440.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo icon on background_600x600.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo and text on background_462x174.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo with one SlimeVR mascot_920x430.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo with two SlimeVR mascots_920x430.png",
      "images/press-kit/logos/SlimeVR/SlimeVR logo with three SlimeVR mascots_1232x706.png",
    ],
  },
  {
    Category: "Butterfly Trackers Logo",
    Images: [
      "images/press-kit/logos/Butterfly/Butterfly Trackers Logo_2480x2815.png",
    ],
  },
  {
    Category: "Trackers Shots",
    Images: [
      {
        href: "images/press-kit/product-shots/SlimeVR Wi-Fi Trackers_1599x620.jpg",
        label: "SlimeVR Wi-Fi Trackers",
      },
    ],
  },
];

export const PressKitMediaGallery: Component = () => (
  <div class="flex flex-col gap-4">
    <Typography tag="h2" variant="section-title" class="mb-1">
      Media Gallery
    </Typography>
    <For each={mediaGalleryContents}>
      {(category) => (
        <div class="flex flex-col gap-4">
          <Typography tag="h3" variant="section-title">
            {category.Category}
          </Typography>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
            <For each={category.Images}>
              {(file) => <MediaFile file={file} />}
            </For>
          </div>
        </div>
      )}
    </For>
  </div>
);

interface MediaFileProps {
  file?:
    | string
    | {
        href: string;
        label: string;
      };
}

const MediaFile: Component<MediaFileProps> = (props) => {
  if (typeof props.file === "string") {
    return (
      <figure class="flex flex-col gap-2">
        <img src={props.file} loading="lazy" class="w-full h-auto" />
      </figure>
    );
  }

  return (
    <figure class="flex flex-col gap-2">
      <img src={props.file!.href} loading="lazy" class="w-full h-auto" />

      <figcaption>
        <Typography tag="span">{props.file!.label}</Typography>
      </figcaption>
    </figure>
  );
};
