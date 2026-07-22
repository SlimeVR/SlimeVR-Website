import { A, useParams } from "@solidjs/router";
import { Link, Meta, Title } from "@solidjs/meta";
import { createMemo, createResource, Show } from "solid-js";
import { NewsPostContent } from "~/components/news";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import type { Post } from "~/types/posts";

export default function PostPage() {
  const params = useParams<{ slug: string }>();
  const [post] = createResource<Post | null, string>(
    () => params.slug,
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
      <Link rel="canonical" href={`https://slimevr.dev/news/${params.slug}`} />

      <Section>
        <Show
          when={post()}
          fallback={
            <Typography tag="h1" variant="section-title">
              Loading post...
            </Typography>
          }
        >
          <div class="rounded-2xl bg-background-70 border border-background-40 p-6 md:p-8 my-10">
            <A
              href="/news"
              class="inline-flex items-center gap-1 text-sm text-background-30 hover:text-background-10 transition-colors mb-6"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
              Back to news
            </A>

            <div class="relative overflow-clip rounded-xl">
              <div class="absolute inset-0 opacity-25 pattern" />
              <div class="relative flex flex-col">
                <Typography tag="p" class="text-xs font-medium tracking-widest text-background-30">
                  {metadata()!.date}
                </Typography>
                <Typography tag="h1" class="text-3xl sm:text-4xl font-bold leading-tight text-background-10 pb-10">
                  {metadata()!.title}
                </Typography>
              </div>
            </div>

            <Show
              when={html()}
              fallback={
                <Typography tag="p" color="secondary">
                  Loading post content...
                </Typography>
              }
            >
              <NewsPostContent html={html()!} />
            </Show>
          </div>
        </Show>
      </Section>
    </MainLayout>
  );
}
