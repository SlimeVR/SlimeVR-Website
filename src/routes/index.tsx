import { Link, Meta } from "@solidjs/meta";
import { A, useLocation } from "@solidjs/router";
import { Component, ParentProps, createEffect } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { DownloadSection } from "~/components/home/DownloadSection";
import { HeroSection } from "~/components/home/HeroSection";
import { QASection } from "~/components/home/QASection";
import { VideoSection } from "~/components/home/VideoSection";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { scrollToSection } from "~/utils/dom";

const UseCaseCard: Component<{ title: string; image: string; desc: string }> = (
  props
) => {
  return (
    <Container class="gap-4 flex flex-col sm:flex-row md:flex-col">
      <div class="sm:hidden md:block">
        <Typography
          tag="h3"
          variant="main-title"
          textAlign="text-center"
          key={props.title}
        />
      </div>
      <div class="flex justify-center items-center sm:justify-start h-52 md:h-auto no-interact sm:w-fit">
        <img
          src={props.image}
          loading="lazy"
          class="h-full sm:w-full sm:h-auto sm:p-8 md:p-0"
          alt={props.title}
        />
      </div>
      <div class="flex flex-col sm:gap-4 sm:justify-center sm:w-full">
        <div class="hidden sm:block md:hidden">
          <Typography
            tag="h3"
            variant="main-title"
            textAlign="text-center"
            key={props.title}
          />
        </div>
        <Typography tag="p" key={props.desc} />
      </div>
    </Container>
  );
};

export default function HomePage(props: ParentProps) {
  const location = useLocation();

  // scroll to a section after navigation (for dom.ts#scrollToSection)
  createEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | undefined)
      ?.scrollTo;
    if (!scrollTo) return;

    requestAnimationFrame(() => {
      scrollToSection(scrollTo, location.pathname, () => {});
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
        <Section>
          <DownloadSection></DownloadSection>
        </Section>

        <Section gizmo="/images/Webpage_Design_Parts_first_block_bg.webp">
          <VideoSection></VideoSection>
        </Section>

        <Section>
          <div class="flex flex-col items-center gap-4">
            <Typography
              tag="h2"
              variant="main-title"
              key="home.use-cases.title"
            />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <UseCaseCard
                title="home.use-cases.vr.title"
                image="/images/vr.webp"
                desc="home.use-cases.vr.desc"
              ></UseCaseCard>
              <UseCaseCard
                title="home.use-cases.vtubing.title"
                image="/images/vtubing.webp"
                desc="home.use-cases.vtubing.desc"
              ></UseCaseCard>
              <UseCaseCard
                title="home.use-cases.motion-capture.title"
                image="/images/mocap.webp"
                desc="home.use-cases.motion-capture.desc"
              ></UseCaseCard>
            </div>
          </div>
        </Section>

        <Section gizmo="/images/Webpage_Design_Parts_second_block_bg.webp">
          <QASection></QASection>
        </Section>
      </div>
    </MainLayout>
  );
}
