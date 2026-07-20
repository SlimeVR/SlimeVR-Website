import { Link, Meta } from "@solidjs/meta";
import { useAction } from "@solidjs/router";
import { Component, createResource, For } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";
import { getEventsAction } from "~/utils/server";
import { DiscordEvent } from "~/utils/server";

const getDates = (
  startDate: string,
  rule: DiscordEvent["recurrenceRule"] | null,
  count = 4
): Date[] => {
  if (!rule) return [new Date(startDate)];

  const step = Math.max(rule.interval ?? 1, 1) * 7;
  const limit = Math.min(count, rule.count ?? count);

  const dates: Date[] = [];
  let current = new Date(startDate);

  while (current < new Date()) {
    current.setDate(current.getDate() + step);
  }

  for (let i = 0; i < limit; i++) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + step);
  }

  return dates;
};

const getDayName = (day: number): string => {
  // discord:
  // sunday = 0, monday = 1, tuesday = 2, wednesday = 3, thursday = 4, friday = 5, saturday = 6
  const locale = navigator.language || "en-US";
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + day);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

const formatDate = (date: Date) => {
  const localDate = new Date(date);

  return localDate.toLocaleString(undefined, {
    dateStyle: "long",
  });
};

const formatTime = (date: Date | string) => {
  const localDate = new Date(date);

  return localDate
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    })
    .replace("GMT", "UTC");
};

const EventCard: Component<{
  event: DiscordEvent;
}> = (props) => {
  const e = props.event;
  const dates = getDates(e.startDate, e.recurrenceRule, 2);
  const day = dates.length > 0 ? getDayName(dates[0].getDay()) : "";

  const image = e.image
    ? `https://cdn.discordapp.com/guild-events/${e.id}/${e.image}.png?size=1024`
    : "/images/nighty_floating.webp";
  const link = `https://discord.com/events/${e.guild_id}/${e.id}`;

  return (
    <Container class="flex h-full flex-col gap-4 overflow-hidden">
      <div class="w-full overflow-hidden rounded-lg bg-background-40 no-interact">
        <img
          src={image}
          loading="lazy"
          alt={e.name}
          class="h-full w-full object-cover"
        />
      </div>

      <div class="flex flex-col gap-4 flex-1">
        <div class="flex flex-col gap-2">
          <Typography
            tag="h2"
            textAlign="text-center"
            variant="section-title"
            key={e.name}
          />

          {/* host + location */}
          <div class="flex flex-row justify-between">
            <Typography
              tag="p"
              textAlign="text-center"
              color="secondary"
              class="text-sm"
            >
              Host: @{e.username}
            </Typography>
            <Typography tag="p" color="secondary">
              On: {e.entity_metadata.location}
            </Typography>
          </div>
        </div>

        <div class="w-full h-px bg-background-40" />

        <div class="flex min-h-18 flex-1 justify-center">
          <Typography tag="p" textAlign="text-center" key={e.description} />
        </div>

        <div class="flex flex-col gap-3 rounded-lg bg-background-60 p-4">
          {/* every (x) */}
          {day && e.recurrenceRule && (
            <Typography
              tag="p"
              color="primary"
              class="font-medium"
              textAlign="text-center"
            >
              Every {day} @ {formatTime(e.startDate)}
            </Typography>
          )}

          <div class="w-full h-px bg-background-40" />

          {/* upcoming dates/times */}
          <div class="flex flex-col justify-start gap-1">
            <For each={dates}>
              {(date) => (
                <Typography
                  tag="span"
                  textAlign="text-center"
                  color="primary"
                  class="text-sm"
                >
                  {formatDate(date)}
                </Typography>
              )}
            </For>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <ArrowButton variant="primary" href={link} target="_blank">
          <Typography
            tag="span"
            whitespace="whitespace-nowrap"
            class="text-[1.2rem] font-bold"
          >
            View Event
          </Typography>
        </ArrowButton>
      </div>
    </Container>
  );
};

export default function EventsPage() {
  const [events] = createResource(async () => {
    const action = useAction(getEventsAction());
    const result = await action();
    return result;
  });

  return (
    <MainLayout>
      <AppTitle key="events.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/events" />

      <Section>
        <Container class="mt-4">
          {/* section text */}
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
                <Localized id="events.faq" />
              </Button>
            </div>
          </div>

          <Typography
            tag="p"
            key="events.description"
            whitespace="whitespace-pre-line"
          />

          {/* virtual events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography tag="h2" variant="section-title" key="events.virtual" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={events()}>
                {(event) => <EventCard event={event} />}
              </For>
            </div>
          </div>

          {/* other events */}
          <div class="flex flex-col mt-8 gap-4">
            <Typography
              tag="h2"
              variant="section-title"
              key="events.other"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <For each={events()}>
                {(event) => <EventCard event={event} />}
              </For>
            </div>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
