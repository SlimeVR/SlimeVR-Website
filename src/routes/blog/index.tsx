import { Link, Meta } from "@solidjs/meta";
import { Typography } from "~/components/commons";
import { AppTitle, MainLayout, Section } from "~/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { BlogInfiniteScroll } from "~/features/blog";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

export default function Blog() {
  return (
    <MainLayout>
      <AppTitle key="blog.title" />
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/blog" />

      <Section>
        <div class="flex flex-col py-5 mb-6">
          <Typography
            tag="h1"
            variant="main-title"
            key="blog.title"
            class="mt-12 mb-2"
          />
          <QueryClientProvider client={queryClient}>
            <BlogInfiniteScroll />
          </QueryClientProvider>
        </div>
      </Section>
    </MainLayout>
  );
}
