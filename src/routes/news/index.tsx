import { Link, Meta } from "@solidjs/meta";
import { onMount } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { Post } from "~/utils/posts";

export default function NewsPage() {
  let posts: Post[] = [];

  onMount(() => {
    (async () => {
      const { getPosts, getPost } = await import("~/utils/posts");
      posts = await getPosts();

      console.log("posts", posts);
      console.log("getPost('test'), ", await getPost("test"));
    })();
  });

  return (
    <MainLayout>
      <AppTitle key="home.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/" />
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/Webpage_Design_Parts_first_block_bg.webp"
        type="image/webp"
      />

    <Section>
      
    </Section>

    </MainLayout>
  );
}
