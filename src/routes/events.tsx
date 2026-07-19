import { Link, Meta } from "@solidjs/meta";
import { useAction } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";
import { testAction } from "~/utils/server";

const EventCard: Component<{
  title: string;
  image: string;
  desc: string;
  link: string;
}> = (props) => {
  return (
    // placeholder, way too big rn lol
    // needs to show local times and dates - maybe countdown?
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
            View Event
          </Typography>
        </ArrowButton>
      </div>
    </Container>
  );
};

export default function EventsPage() {
  onMount(async () => {
    const action = useAction(testAction);
    console.log("meow " + (JSON.stringify(await action(`test`), null, 2)));
  });

  return (
    <MainLayout>
      <AppTitle key="events.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/events" />

      <Section>
        <Container class="mt-4">
          {/* section text */}
          <div class="flex flex-row justify-between items-center mb-8">
            <Typography
              tag="h2"
              variant="main-title"
              textAlign="text-center"
              key="events.title"
            />
            <Button variant="primary" href="https://discord.gg/slimevr">
              <Localized id="events.discord.button" />
            </Button>
          </div>
          <Typography
            tag="p"
            key="events.description"
            whitespace="whitespace-pre-line"
          />

          {/* discord events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography
              tag="h2"
              variant="section-title"
              key="events.discord.title"
            />
            <Typography tag="p" key="events.discord.description" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* would be a <For> here */}
              <EventCard
                title="something here"
                image="/images/vr.webp"
                desc="another thing here"
                link="https://github.com/SlimeVR/SlimeVR-Server/issues"
              ></EventCard>
            </div>
          </div>

          {/* other events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography
              tag="h2"
              variant="section-title"
              key="events.other.title"
            />
            <Typography tag="p" key="events.other.description" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* would be a <For> here */}
              <EventCard
                title="something here"
                image="/images/vr.webp"
                desc="another thing here"
                link="https://github.com/SlimeVR/SlimeVR-Server/issues"
              ></EventCard>
            </div>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
