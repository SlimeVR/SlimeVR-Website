import { Link, Meta } from "@solidjs/meta";
import { Component } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";

const FeedbackCard: Component<{
  title: string;
  image: string;
  desc: string;
  link: string;
}> = (props) => {
  return (
    <Container class="gap-4 flex flex-col sm:flex-row md:flex-col">
      <div class="sm:hidden md:block">
        <Typography
          tag="h2"
          variant="section-title"
          textAlign="text-center"
          key={props.title}
        />
      </div>
      <div class="flex justify-center items-center h-52 no-interact overflow-hidden rounded-lg">
        <img
          src={props.image}
          loading="lazy"
          class="h-full w-full object-contain"
          alt={props.title}
        />
      </div>
      <div class="flex flex-col sm:gap-4 sm:justify-center sm:w-full">
        <div class="hidden sm:block md:hidden">
          <Typography
            tag="h2"
            variant="section-title"
            textAlign="text-center"
            key={props.title}
          />
        </div>
        <Typography tag="p" textAlign="text-center" key={props.desc} />
      </div>
      <div class="flex justify-center items-center sm:justify-end md:justify-center">
        <ArrowButton variant="primary" href={props.link} target="_blank">
          <Typography
            variant="section-title"
            tag="span"
            whitespace="whitespace-nowrap"
          >
            Leave feedback
          </Typography>
        </ArrowButton>
      </div>
    </Container>
  );
};

export default function FeedbackPage() {
  return (
    <MainLayout>
      <AppTitle key="feedback.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/feedback" />

      <Section>
        <Container class="mt-4">
          <div class="mb-8">
            <Typography
              tag="h1"
              variant="main-title"
              key="feedback.title"
            ></Typography>
          </div>

          <Typography tag="p" key="feedback.description"></Typography>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
            <FeedbackCard
              title="feedback.software.title"
              image="/images/vr.webp"
              desc="feedback.software.description"
              link="https://github.com/SlimeVR/SlimeVR-Server/issues"
            ></FeedbackCard>
            <FeedbackCard
              title="feedback.steam.title"
              image="/images/vtubing.webp"
              desc="feedback.steam.description"
              link="https://github.com/SlimeVR/SlimeVR-Steam"
            ></FeedbackCard>
            <FeedbackCard
              title="feedback.dongle.title"
              image="/images/mocap.webp"
              desc="feedback.dongle.description"
              link="https://github.com/SlimeVR/SlimeVR-Tracker-nRF-Receiver"
            ></FeedbackCard>
            <FeedbackCard
              title="feedback.nrf.title"
              image="/images/butterfly_tracker.webp"
              desc="feedback.nrf.description"
              link="https://github.com/SlimeVR/SlimeVR-Tracker-nRF"
            ></FeedbackCard>
            <FeedbackCard
              title="feedback.esp.title"
              image="/images/og_slime.webp"
              desc="feedback.esp.description"
              link="https://github.com/SlimeVR/SlimeVR-Tracker-ESP"
            ></FeedbackCard>
          </div>

          {/* form placeholder */}
          <div class="mt-8 flex flex-col gap-2">
            <Typography
              tag="h2"
              variant="section-title"
              key="feedback.form.title"
            />
            <Typography tag="p" key="feedback.form.description" />
            <form class="flex flex-col mt-2 gap-4 w-full max-w-lg">
              <input
                type="text"
                placeholder="Name"
                class="p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                class="p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Feedback"
                class="p-2 border border-gray-300 rounded h-32 resize-none"
              ></textarea>
              <button
                type="submit"
                class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
