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
      <div class="absolute inset-3 py-3 z-10">
        <div class="inline-block max-w-full">
          <h3 class="line-clamp-3 text-xl font-bold leading-tight">
            <span class={textBlockClasses}>{props.title}</span>
          </h3>

          <div
            class="absolute right-[225px] left-1 h-1.5 w-68 rounded-full ml-1 mr-3 mt-1"
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
        class="absolute right-1 mt-3 max-h-50 md:w-3/6 object-contain mx-auto"
        loading="lazy"
      />
    </div>
  );
};
