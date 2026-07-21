import { Link, Meta } from "@solidjs/meta";
import { useAction } from "@solidjs/router";
import { createMemo, createResource, For } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { getEventsAction } from "~/utils/server";
import { sortByNextDate } from "~/utils/events-helpers";
import EventsHeader from "~/components/events/EventsHeader";
import EventCard from "~/components/events/EventCard";
import { FAQSection } from "~/components/commons/FAQSection";

const QUESTIONS_COUNT = 5;

const questions = createMemo(() =>
  Array.from({ length: QUESTIONS_COUNT }).map((_, index) => ({
    question: `events.faq.questions.question-${index + 1}.question`,
    answer: `events.faq.questions.question-${index + 1}.answer`,
  }))
);

export default function EventsPage() {
  const [events] = createResource(async () => {
    const action = useAction(getEventsAction());
    const result = await action();
    return sortByNextDate(result);
  });

  const eventList = () => events() ?? [];

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
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventList().length === 0 ? (
                <Typography tag="p" key="events.no-events" />
              ) : (
                <For each={eventList()}>
                  {(event) => <EventCard event={event} />}
                </For>
              )}
            </div>
          </div>

          {/* other events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography tag="h2" variant="section-title" key="events.other" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* {eventList().length === 0 ? (
                <Typography tag="p" key="events.no-events" />
              ) : (
                <For each={eventList()}>
                  {(event) => <EventCard event={event} />}
                </For>
              )} */}
              <Typography tag="p" key="events.no-events" />
            </div>
          </div>
        </Container>

        {/* FAQ */}
        <div class="mt-4">
          <FAQSection
            id="faq"
            titleKey="events.faq.title"
            items={questions()}
          />
        </div>
      </Section>
    </MainLayout>
  );
}
