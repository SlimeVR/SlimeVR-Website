import { Component } from "solid-js";
import { Button } from "~/components/commons/Button";
import { Typography } from "~/components/commons/Typography";
import { Localized } from "~/i18n";

const EventsHeader: Component = () => (
  <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <Typography
      tag="h2"
      variant="main-title"
      textAlign="text-center"
      key="events.title"
    />
    <div class="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
      <Button
        variant="primary"
        href="https://vrchat.com/home/group/grp_091d568c-bad2-4d16-b694-c7782957bf06"
        class="w-full sm:w-auto"
      >
        <Localized id="events.vrchat" />
      </Button>
      <Button
        variant="primary"
        href="https://discord.gg/slimevr"
        class="w-full sm:w-auto"
      >
        <Localized id="events.discord" />
      </Button>
      <Button variant="primary" href="#faq" class="w-full sm:w-auto">
        <Localized id="events.faq.title" />
      </Button>
    </div>
  </div>
);

export default EventsHeader;
