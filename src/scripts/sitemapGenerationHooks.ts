import {
  fetchAllBlogPosts,
  getLatestBlogPostDate,
} from "../features/blog/tools/blogPosts.helper";
import { join } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const SITE_URL = "https://slimevr.dev";
const BUILD_OUTPUT_DIR = join(process.cwd(), ".output/public");
const SITEMAP_OUTPUT_DIR = join(BUILD_OUTPUT_DIR, "sitemap.xml");
const BASE_LASTMOD = new Date("2025-12-23T20:50:03.000Z").toISOString();

const preRenderedRoutes: string[] = [];

export function prerenderGenerate(route: { route: string }) {
  preRenderedRoutes.push(route.route);
}

export async function prerenderDone() {
  const allBlogPosts = fetchAllBlogPosts();
  const latestBlogPostDate = getLatestBlogPostDate(allBlogPosts);
  const blogPostPathsWithDates = new Map(
    allBlogPosts.map((post) => [
      `/blog/${post.metadata.postId}`,
      post.metadata.date.toISOString(),
    ])
  );

  const sitemapRoutes = preRenderedRoutes.filter(
    (route) => !route.includes("/404")
  );

  const stream = new SitemapStream({ hostname: SITE_URL });
  sitemapRoutes.forEach((sitemapRoute) => {
    stream.write({
      url: sitemapRoute,
      lastmod: calculateLastMod(
        sitemapRoute,
        latestBlogPostDate,
        blogPostPathsWithDates
      ),
      priority: sitemapRoute === "/" ? 1 : 0.8,
    });
  });
  stream.end();

  mkdirSync(BUILD_OUTPUT_DIR, { recursive: true });
  writeFileSync(SITEMAP_OUTPUT_DIR, (await streamToPromise(stream)).toString());

  console.info(
    `[sitemap] Generated sitemap.xml file (${sitemapRoutes.length}/${preRenderedRoutes.length} route(s))`
  );
}

function calculateLastMod(
  sitemapRoute: string,
  latestBlogPostDate: string,
  blogPostPathsWithDates: Map<string, string>
) {
  if (sitemapRoute === "/blog") {
    return latestBlogPostDate;
  }

  if (blogPostPathsWithDates.has(sitemapRoute)) {
    return blogPostPathsWithDates.get(sitemapRoute);
  }

  return BASE_LASTMOD;
}
