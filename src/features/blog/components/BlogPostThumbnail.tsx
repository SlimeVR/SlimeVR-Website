import { Component } from "solid-js";
import { BlogPostThumbnailPlaceholder } from "../utils/blog.thumbnail.helper";
import clsx from "clsx";

interface BlogPostThumbnailProps {
  title: string;
  placeholder: BlogPostThumbnailPlaceholder;
}

export const BlogPostThumbnail: Component<BlogPostThumbnailProps> = (props) => {
  const textBlockClasses = clsx(
    "from-background-80 to-background-80/90 bg-gradient-to-r",
    "p-1 px-2",
    "box-decoration-clone",
    "rounded-xl"
  );

  return (
    <div
      data-testid="blog-post-thumbnail"
      class={clsx(
        "relative",
        "w-full",
        "h-48",
        "overflow-hidden",
        "rounded-xl",
        "bg-background-80",
        "select-none"
      )}
    >
      <div class="absolute inset-3 z-10 py-3">
        <div class="inline-block max-w-full">
          <h3 class="line-clamp-3 text-xl leading-tight font-bold">
            <span class={textBlockClasses}>{props.title}</span>
          </h3>

          <div
            class="absolute right-[225px] left-1 mt-1 mr-3 ml-1 h-1.5 w-68 rounded-full"
            style={{ background: props.placeholder.accentColor }}
          />
        </div>

        <div class="absolute bottom-0 flex items-end">
          <span class={textBlockClasses}>SlimeVR</span>
        </div>
      </div>

      <img
        src={props.placeholder.thumbnailPictureUrl}
        alt={props.title}
        class="absolute right-1 mx-auto mt-3 max-h-50 object-contain md:w-3/6"
        loading="lazy"
      />
    </div>
  );
};
