import { Link, Meta } from "@solidjs/meta";
import { createMemo, createResource, For } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import {
  getFallbackEvents,
  sortByNextDate,
  toEventData,
  type EventData,
} from "~/utils/events";
import { getCustomEvents } from "~/assets/events-custom";
import EventsHeader from "~/components/events/EventsHeader";
import EventCard from "~/components/events/EventCard";
import { FAQSection } from "~/components/commons/FAQSection";

const QUESTIONS_COUNT = 5;

export default function EventsPage() {
  const [events] = createResource(async () => {
    if (import.meta.env.DEV) {
      console.log(`Development environment, using fallback events`);
      return getFallbackEvents();
    }

    try {
      const response = await fetch("/api/events");

      const status = response.status;
      if (status === 404) console.warn("no events returned");
      if (status === 500) console.error("server error fetching events");
      if (!response.ok)
        throw new Error(`Failed to fetch events: ${response.status}`);

      const result = (await response.json()) as unknown[];

      return result.map(toEventData);
    } catch (error) {
      const msg = (error as Error).message;
      console.error(`Failed to fetch events: ${msg}`);
      return [];
    }
  });

  const virtualEvents = createMemo(() => sortByNextDate(events() ?? []));
  const otherEvents = createMemo(() => sortByNextDate(getCustomEvents()));

  const questions = Array.from({ length: QUESTIONS_COUNT }).map((_, index) => ({
    question: `events.faq.questions.question-${index + 1}.question`,
    answer: `events.faq.questions.question-${index + 1}.answer`,
  }));

  const renderEvents = (list: EventData[]) => (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.length === 0 ? (
        <Typography tag="p" key="events.no-events" />
      ) : (
        <For each={list}>{(event) => <EventCard event={event} />}</For>
      )}
    </div>
  );

  return (
    <MainLayout>
      <AppTitle key="events.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/events" />

      <Section>
        <Container class="mt-4">
          <EventsHeader />

          <Typography
            tag="p"
            key="events.description"
            whitespace="whitespace-pre-line"
          />

          {/* virtual events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography tag="h2" variant="section-title" key="events.virtual" />
            {renderEvents(virtualEvents())}
          </div>

          {/* other events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography tag="h2" variant="section-title" key="events.other" />
            {renderEvents(otherEvents())}
          </div>
        </Container>

        {/* FAQ */}
        <div class="mt-4">
          <FAQSection id="faq" titleKey="events.faq.title" items={questions} />
        </div>
      </Section>
    </MainLayout>
  );
}
