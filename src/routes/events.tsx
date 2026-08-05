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

const QUESTIONS_COUNT = 5;

export default function EventsPage() {
  const [events, setEvents] = createSignal<EventData[] | null>(null);

  onMount(async () => {
    const fetchedEvents = await fetchEvents();
    setEvents(fetchedEvents);
  });

  const virtualEvents = createMemo(() => sortByNextDate(events() ?? []));
  const otherEvents = createMemo(() => sortByNextDate(getCustomEvents() ?? []));

  const eventsSchema = createMemo(() => {
    const schema = buildEventsJsonLd([...virtualEvents(), ...otherEvents()]);
    return schema ? JSON.stringify(schema) : null;
  });

  const questions = Array.from({ length: QUESTIONS_COUNT }).map((_, index) => ({
    question: `events.faq.questions.question-${index + 1}.question`,
    answer: `events.faq.questions.question-${index + 1}.answer`,
  }));

  const renderEvents = (list: EventData[], isLoading = false) => (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Show
        when={!isLoading}
        fallback={<Typography tag="p" key="events.loading" />}
      >
        {list.length === 0 ? (
          <Typography tag="p" key="events.no-events" />
        ) : (
          <For each={list}>{(event) => <EventCard event={event} />}</For>
        )}
      </Show>
    </div>
  );

  return (
    <MainLayout>
      <AppTitle key="events.title" />
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/events" />
      <Show when={eventsSchema()}>
        {(schema) => <script type="application/ld+json">{schema()}</script>}
      </Show>

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
            {renderEvents(virtualEvents(), events() === null)}
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
