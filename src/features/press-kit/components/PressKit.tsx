import { translator } from "@solid-primitives/i18n";
import remarkGfm from "remark-gfm";
import { Component } from "solid-js";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Container } from "~/components/commons";
import { PressKitMediaGallery } from "./PressKitMediaGallery";

export const PressKit: Component = (props) => {
  return (
    <div class="flex flex-col gap-12 mt-4">
      asd
      <PressKitMediaGallery/>
    </div>
  );
};
