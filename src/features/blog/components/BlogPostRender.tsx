import { Meta, Title } from "@solidjs/meta";
import { Component, createMemo, Show } from "solid-js";
import { Container, Typography } from "~/components/commons";
import { FormattedDate, MarkdownContentRender } from "~/features/blog";
import { BlogPost } from "~/features/blog/blog.types";
import { extractBlogHeadings } from "../utils/blog-table-of-contents.helper";
import { getBlogPostThumbnailPlaceholderAttributes } from "../utils/blog.thumbnail.helper";
import { BlogPostTableOfContents } from "./BlogPostTableOfContents";
import { SITE_PATH } from "~/utils/constants";

const BlogPostThumbnailPlaceholder: Component<BlogPostRenderProps> = (
  props
) => {
  const thumbnailSettings = createMemo(() =>
    getBlogPostThumbnailPlaceholderAttributes(props.post.metadata.title)
  );

  return (
    <div class="relative h-62 from-transparent to-background-80 bg-gradient-to-r">
      <div class="absolute inset-x-0 top-[15%] flex justify-end pr-4">
        <img
          src={thumbnailSettings().thumbnailPictureUrl}
          class="h-50 w-auto"
        />
      </div>
    </div>
  );
};

const BlogPostThumbnailImage: Component<BlogPostRenderProps> = (props) => {
  return (
    <div class="relative h-80 w-full">
      <img
        src={props.post.metadata.thumbnailUrl}
        alt={props.post.metadata.title}
        class="h-full w-full object-cover bg-background-80 rounded-2xl"
      />
    </div>
  );
};

const BlogPostMarkdownContent: Component<BlogPostRenderProps> = (props) => {
  return (
    <Container>
      <article class="min-w-0">
        <MarkdownContentRender postId={props.post.metadata.postId} content={props.post.content} />
      </article>
    </Container>
  );
};

interface BlogPostRenderProps {
  post: BlogPost;
}

export const BlogPostRender: Component<BlogPostRenderProps> = (props) => {
  const headings = createMemo(() => extractBlogHeadings(props.post.content));

  return (
    <>
      <Title>{`${props.post.metadata.title} - SlimeVR Official`}</Title>
      <Meta
        property="og:title"
        content={`${props.post.metadata.title} - SlimeVR Official`}
      />
      <Meta
        property="og:description"
        content={`${props.post.metadata.description}`}
      />
      <Show when={props.post.metadata.thumbnailUrl}>
        <Meta
          property="og:image"
          content={`${props.post.metadata.thumbnailUrl}`}
        />
      </Show>
      <Meta
        property="og:url"
        content={`${SITE_PATH}/blog/${props.post.metadata.postId}`}
      />

      <div class="my-10 flex flex-col gap-7">
        <Container class="overflow-hidden !p-0">
          <div class="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
            <div class="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <h1 class="text-main-title leading-tight text-background-10">
                {props.post.metadata.title}
              </h1>
              <FormattedDate date={props.post.metadata.date} />
            </div>

            <Show
              when={props.post.metadata.thumbnailUrl}
              fallback={<BlogPostThumbnailPlaceholder post={props.post} />}
            >
              <BlogPostThumbnailImage post={props.post} />
            </Show>
          </div>
        </Container>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
          <BlogPostMarkdownContent post={props.post} />

          <BlogPostTableOfContents headings={headings()} />
        </div>
      </div>
    </>
  );
};
