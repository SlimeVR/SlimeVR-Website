import { Link, Meta } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { DownloadSection } from "~/components/home/DownloadSection";
import { HeroSection } from "~/components/home/HeroSection";
import { QASection } from "~/components/home/QASection";
import { UseCaseSection } from "~/components/home/UseCaseSection";
import { VideoSection } from "~/components/home/VideoSection";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { scrollToSection } from "~/utils/dom";

export default function HomePage() {
  const location = useLocation();

  // scroll to a section after navigation (for dom.ts#scrollToSection)
  createEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | undefined)
      ?.scrollTo;
    if (!scrollTo) return;

    requestAnimationFrame(() => {
      scrollToSection(scrollTo, location.pathname);
    });
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
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/nighty_floating.webp"
        type="image/webp"
      />
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/butterfly_tracker.webp"
        type="image/webp"
      />

      <Section>
        <HeroSection></HeroSection>
      </Section>

      <div class="flex flex-col pt-20 sm:pt-64 md:pt-16 gap-20 w-full items-center">
        <Section gizmo="/images/Webpage_Design_Parts_first_block_bg.webp">
          <VideoSection></VideoSection>
        </Section>

        <Section>
          <DownloadSection></DownloadSection>
        </Section>

        <Section>
          <UseCaseSection></UseCaseSection>
        </Section>

        <Section gizmo="/images/Webpage_Design_Parts_second_block_bg.webp">
          <QASection></QASection>
        </Section>
      </div>
    </MainLayout>
  );
}
