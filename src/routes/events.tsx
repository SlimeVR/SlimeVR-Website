import { Link, Meta } from "@solidjs/meta";
import { useAction } from "@solidjs/router";
import { createResource } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { getEventsAction } from "~/utils/server";
import { sortByNextDate } from "~/utils/events-helpers";
import EventsHeader from "~/components/events/EventsHeader";
import EventSection from "~/components/events/EventSection";

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
          <Typography tag="p" key="events.description" whitespace="whitespace-pre-line" />
          <EventSection titleKey="events.virtual" events={eventList()} />
          <EventSection titleKey="events.other" events={eventList()} />
        </Container>
      </Section>
    </MainLayout>
  );
}
