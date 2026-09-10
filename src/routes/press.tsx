import { Link, Meta } from "@solidjs/meta";
import { createMemo, createSignal, For, onMount, Show } from "solid-js";
import {
  buildEventsJsonLd,
  sortByNextDate,
  type EventData,
} from "~/features/events/utils/events";
import { fetchEvents } from "~/features/events/api/fetchEventsApi";
import { EventCard, EventsHeader } from "~/features/events";
import { getCustomEvents } from "~/features/events/data/events-custom";
import { Typography, FAQSection, Container } from "~/components/commons";
import { AppTitle, MainLayout, Section } from "~/components/layout";

export default function PressKit() {

  return (
    <MainLayout>
      <AppTitle key="events.title" />
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/events" />

      <Section>
          <Typography
            tag="p"
            key="events.description"
            whitespace="whitespace-pre-line"
          />
      </Section>
    </MainLayout>
  );
}
