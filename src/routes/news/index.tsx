import { Link, Meta } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createResource, For } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import type { Post } from "~/utils/posts";

export default function NewsPage() {
  const [posts] = createResource<Post[]>(async () => {
    const { getPosts } = await import("~/utils/posts");
    return getPosts();
  });

  return (
    <MainLayout>
      <AppTitle key="news.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/news" />

      <Section>
        <Container class="mt-4">
          <div class="mb-8">
            <Typography
              tag="h1"
              variant="main-title"
              key="news.title"
            ></Typography>
          </div>

          <Typography tag="p">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed euismod,
            nisl nec tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl
            nunc eget nunc.
          </Typography>

          {/* news posts */}
          <div class="mt-8">
            {(posts()?.length ?? 0) > 0 ? (
              <div class="grid gap-3 grid-cols-1 md:grid-cols-2">
                <For each={posts()}>
                  {(post) => (
                    <A
                      href={`/news/${post.slug}`}
                      class="group flex flex-col gap-2 rounded-2xl border border-background-40 bg-background-60 px-5 py-4 transition-colors hover:bg-background-50"
                    >
                      <div class="flex items-start justify-between gap-4">
                        <div class="flex flex-col gap-1">
                          <Typography
                            tag="h3"
                            variant="section-title"
                            class="group-hover:text-background-20 transition-colors"
                          >
                            {post.metadata.title}
                          </Typography>
                          <Typography tag="p" color="secondary" class="text-sm">
                            {post.metadata.date}
                          </Typography>
                        </div>
                      </div>
                      <Typography tag="p" color="secondary">
                        {post.metadata.description}
                      </Typography>
                    </A>
                  )}
                </For>
              </div>
            ) : (
              <div class="rounded-2xl border border-dashed border-background-40 bg-background-70 px-5 py-8 text-center">
                <Typography
                  tag="p"
                  variant="section-title"
                  key="news.none"
                ></Typography>
                <Typography
                  tag="p"
                  color="secondary"
                  key="news.later"
                ></Typography>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
