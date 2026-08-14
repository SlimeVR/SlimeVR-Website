import { Link, Meta } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { AppTitle, MainLayout, Section } from "~/components/layout";
import { BlogPostRender, BlogPostSkeleton } from "~/features/blog";
import { getBlogPost } from "~/features/blog/utils/blog.helper";

export default function BlogPostRoute() {
  const params = useParams<{ postId: string }>();
  const [post] = createResource(
    () => params.postId,
    async (postId) => getBlogPost(postId)
  );

  return (
    <MainLayout>
      <AppTitle key="blog.title" />
      <Meta name="robots" content="index, follow" />
      <Link
        rel="canonical"
        href={`https://slimevr.dev/blog/${params.postId}`}
      />

      <Section>
        <Show when={post()} fallback={<BlogPostSkeleton />}>
          <BlogPostRender post={post()!} />
        </Show>
      </Section>
    </MainLayout>
  );
}
