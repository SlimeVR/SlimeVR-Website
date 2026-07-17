import { Link, Meta, Title } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { createMemo, createResource, Show } from "solid-js";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import type { Post } from "~/utils/posts";

export default function PostPage() {
  const location = useLocation();
  const slug = createMemo(() => {
    const parts = location.pathname.split("/");
    return parts[parts.length - 1];
  });
  const [post] = createResource<Post | null, string>(
    () => slug(),
    async (slug) => {
      const { getPost } = await import("~/utils/posts");
      return getPost(slug);
    }
  );

  const metadata = createMemo(() => post()?.metadata);
  const html = createMemo(() => post()?.html);

  return (
    <MainLayout>
      <Show when={post()}>
        <Title>{`${metadata()?.title} - SlimeVR Official`}</Title>
      </Show>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href={`https://slimevr.dev/news/${slug()}`} />

      <Section>
        <div class="flex flex-col gap-6 py-6 sm:py-10">
          <Container class="relative overflow-clip">
            <div class="absolute inset-0 opacity-35 pattern"></div>
            <div class="relative flex flex-col gap-3">
              <Show
                when={post()}
                fallback={
                  <Typography tag="h1" variant="section-title">
                    Loading post...
                  </Typography>
                }
              >
                <>
                  <Typography tag="h1" variant="section-title">
                    {metadata()?.title}
                  </Typography>
                  <Typography tag="p" color="secondary">
                    {metadata()?.date}
                  </Typography>
                  <Typography tag="p" class="max-w-3xl" color="secondary">
                    {metadata()?.description}
                  </Typography>
                </>
              </Show>
            </div>
          </Container>

          <Container class="flex flex-col gap-4">
            <Show
              when={html()}
              fallback={
                <Typography tag="p" color="secondary">
                  Loading post content...
                </Typography>
              }
            >
              <div
                innerHTML={html()}
                class="text-sm w-full min-w-full prose-xl prose text-background-10 prose-h1:text-background-10 prose-h2:text-background-10 prose-h3:text-background-10 prose-h3:text-2xl prose-h4:text-background-10 prose-h4:text-xl prose-a:text-background-20 prose-strong:text-background-10 prose-code:text-background-20 prose-blockquote:text-background-10 prose-blockquote:border-background-30 prose-thead:text-background-10 prose-th:text-background-10 prose-td:text-background-10 prose-ul:list-disc prose-li:marker:text-background-10"
              />
            </Show>
          </Container>
        </div>
      </Section>
    </MainLayout>
  );
}
