import { Link, Meta } from "@solidjs/meta";
import { createResource } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { NewsList, NewsPageHeader } from "~/components/news";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import type { Post } from "~/types/posts";
import type { PostsManifest } from "~/utils/posts";

export default function NewsPage() {
  const [manifest] = createResource<PostsManifest>(async () => {
    const { getPostsManifest } = await import("~/utils/posts");
    return getPostsManifest();
  });

  const [posts] = createResource<Post[]>(async () => {
    const { getPostsPage } = await import("~/utils/posts");
    return getPostsPage(1);
  });

  return (
    <MainLayout>
      <AppTitle key="news.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/news" />
      <Section>
        <div class="flex flex-col relative p-5 my-5 min-[1440px]:my-10">
          <NewsPageHeader />
          <NewsList manifest={manifest()} initialPosts={posts()} />
        </div>
      </Section>
    </MainLayout>
  );
}
