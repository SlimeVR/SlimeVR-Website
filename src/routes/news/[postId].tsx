import { Link, Meta, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { getPost } from "~/features/news/helpers/newsPosts.helper";
import { FormattedDate } from "~/features/news/components/FormattedDate";
import { MarkdownBlockRender } from "~/features/news/components/MarkdownBlockRender";

export default function PostPage() {
  const params = useParams<{ postId: string }>();
  const [post] = createResource(
    () => params.postId,
    async (postId) => await getPost(postId)
  );

  return (
    <MainLayout>
      <Meta name="robots" content="index, follow" />
      <Link
        rel="canonical"
        href={`https://slimevr.dev/news/${params.postId}`}
      />
      <Section>
        <Show
          when={post()}
          fallback={
            <Typography tag="h1" variant="section-title">
              Loading post...
            </Typography>
          }
        >
          <Title>{`${post()!.title} - SlimeVR Official`}</Title>
          <div class="rounded-2xl bg-background-70 border border-background-40 p-8 my-6">
            <div>
              <div>
                <FormattedDate date={post()!.date} />
                <Typography
                  tag="h1"
                  variant="main-title"
                  class="font-bold leading-tight text-background-10 mb-6"
                >
                  {post()!.title}
                </Typography>
              </div>
              <MarkdownBlockRender post={post}/>
            </div>
          </div>
        </Show>
      </Section>
    </MainLayout>
  );
}