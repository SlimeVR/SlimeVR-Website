import { Link, Meta } from "@solidjs/meta";
import { createResource, createSignal } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { NewsList } from "~/features/news/components/NewsList";
import { MainLayout } from "~/layouts/MainLayout";

export default function NewsPage() {
  const [page, SetPage] = createSignal(1);

  const [posts] = createResource(page, async (p) => {
    const { getPagePosts } = await import("../../features/news/helpers/newsPosts.helper");
    return getPagePosts(p);
  });

  return (
    <MainLayout>
      <AppTitle key="news.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/news" />

      <Section>
        <div class="flex flex-col relative py-5 mb-6">
          <Typography tag="h1" variant="main-title" key="news.title" class="mt-3 mb-1" />
          <NewsList posts={posts()} />
        </div>
      </Section>
    </MainLayout>
  );
}
