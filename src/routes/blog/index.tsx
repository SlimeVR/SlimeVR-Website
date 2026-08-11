import { Link, Meta } from "@solidjs/meta";
import { Typography } from "~/components/commons";
import { AppTitle, MainLayout, Section } from "~/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { BlogInfiniteScroll } from "~/features/blog";

export default function Blog() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
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
            <BlogInfiniteScroll />
          </div>
        </Section>
      </MainLayout>
    </QueryClientProvider>
  );
}
