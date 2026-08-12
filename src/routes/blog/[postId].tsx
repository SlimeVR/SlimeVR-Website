import { Link, Meta, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { Typography } from "~/components/commons";
import { AppTitle, MainLayout, Section } from "~/components/layout";
import { BlogPostSkeleton, FormattedDate, MarkdownContentRender } from "~/features/blog";
import { getBlogPost } from "~/features/blog/utils/blog.helper";

export default function BlogPost() {
  const params = useParams<{ postId: string }>();
  const [post] = createResource(
    () => params.postId,
    async (postId) => getBlogPost(postId)
  );

  return (
    <MainLayout>
      <AppTitle key="blog.title" />
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href={`https://slimevr.dev/blog/${params.postId}`} />

      <Section>
        <Show when={post()} fallback={<BlogPostSkeleton />}>
          <Title>{`${post()!.metadata.title} - SlimeVR Official`}</Title>
          <div class="rounded-2xl bg-background-70 border border-background-40 p-8 my-6">
            <div>
              <FormattedDate date={post()!.metadata.date} />
              <Typography tag="h1" variant="main-title" class="font-bold leading-tight text-background-10 mb-6">
                {post()!.metadata.title}
              </Typography>
            </div>
            <MarkdownContentRender content={post()!.content}></MarkdownContentRender>
          </div>
        </Show>
      </Section>
    </MainLayout>
  );
}
