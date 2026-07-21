import { Component, For } from "solid-js";
import { CalendarIcon } from "~/components/commons/icons/CalendarIcon";
import { LocationIcon } from "~/components/commons/icons/LocationIcon";
import { UserIcon } from "~/components/commons/icons/UserIcon";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { useI18n } from "~/i18n";
import { DiscordEvent } from "~/utils/server";
import {
  formatDate,
  formatTimeShort,
  formatTimeLocal,
  getTimezone,
  getDayName,
  getDates,
} from "~/utils/events-helpers";

const EventCardHeader: Component<{
  name: string;
  location: string;
  nextDate: Date | undefined;
  startDate: string;
  endDate: string | null;
  day: string;
  recurrenceRule: DiscordEvent["recurrenceRule"] | null;
}> = (props) => {
  const now = new Date();
  const isLive = props.endDate
    ? now >= new Date(props.startDate) && now <= new Date(props.endDate)
    : false;
  return (
    <div class="flex flex-col gap-2">
      <Typography tag="h2" textAlign="text-left" variant="section-title">
        {props.name}
      </Typography>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col gap-1">
          {isLive ? (
            <EventLiveBadge
              startDate={props.startDate}
              nextDate={props.nextDate}
              day={props.day}
            />
          ) : (
            props.nextDate && (
              <EventNextDate
                startDate={props.startDate}
                nextDate={props.nextDate}
              />
            )
          )}
          {props.day && props.recurrenceRule && (
            <EventRecurringInfo startDate={props.startDate} day={props.day} />
          )}
        </div>
        <div class="flex items-center gap-1.5">
          <LocationIcon class="size-4 text-background-30" />
          <Typography tag="p" color="secondary" class="text-sm">
            {props.location}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const EventCardDescription: Component<{ text: string }> = (props) => {
  const maxLen = 180;
  const truncated =
    props.text.length > maxLen
      ? props.text.slice(0, maxLen) + "..."
      : props.text;
  return (
    <div class="flex min-h-18 flex-1 justify-center">
      <Typography tag="p" textAlign="text-left">
        {truncated}
      </Typography>
    </div>
  );
};

const EventCardUpcomingDates: Component<{
  dates: Date[];
}> = (props) => (
  <div class="flex flex-col gap-1">
    <Typography
      tag="p"
      textAlign="text-left"
      color="secondary"
      key="events.upcoming"
    />
    <For each={props.dates}>
      {(date) => (
        <div class="flex items-center gap-2 text-background-10">
          <CalendarIcon class="size-4" />
          <Typography tag="span" textAlign="text-left" color="primary">
            {formatDate(date)} &bull; {formatTimeShort(date)}
          </Typography>
        </div>
      )}
    </For>
  </div>
);

const EventLiveBadge: Component<{
  startDate: string;
  nextDate: Date | undefined;
  day: string;
}> = (props) => {
  const { translator } = useI18n();
  return (
    <div class="flex flex-col gap-1">
      <div
        class="flex items-center gap-2"
        title={
          props.nextDate
            ? `${formatDate(props.nextDate)} \u2022 ${formatTimeShort(props.nextDate)}`
            : undefined
        }
      >
        <span class="size-2 rounded-full bg-status-success" />
        <Typography
          tag="span"
          textAlign="text-left"
          color="primary"
          class="text-sm font-medium"
          key="events.live"
        />
      </div>
      {props.day && (
        <Typography
          tag="p"
          textAlign="text-left"
          color="secondary"
          class="text-xs"
        >
          <span
            title={`${formatTimeLocal(props.startDate)} ${getTimezone(props.startDate)}`}
          >
            {translator("events.recurring", {
              day: props.day,
              time: formatTimeLocal(props.startDate),
            })}
          </span>
        </Typography>
      )}
    </div>
  );
};

const EventNextDate: Component<{
  startDate: string;
  nextDate: Date;
}> = (props) => (
  <div class="flex items-center gap-2 text-background-10">
    <CalendarIcon class="size-4" />
    <span
      title={`${formatTimeLocal(props.nextDate)} ${getTimezone(props.startDate)}`}
    >
      <Typography
        tag="span"
        textAlign="text-left"
        color="primary"
        class="text-sm"
      >
        {formatDate(props.nextDate)} &bull; {formatTimeShort(props.nextDate)}
      </Typography>
    </span>
  </div>
);

const EventRecurringInfo: Component<{
  startDate: string;
  day: string;
}> = (props) => {
  const { translator } = useI18n();
  return (
    <Typography tag="p" textAlign="text-left" color="secondary" class="text-xs">
      <span
        title={`${formatTimeLocal(props.startDate)} ${getTimezone(props.startDate)}`}
      >
        {translator("events.recurring", {
          day: props.day,
          time: formatTimeLocal(props.startDate),
        })}
      </span>
    </Typography>
  );
};

const EventCardBottomRow: Component<{
  eventLink: string;
  username: string;
}> = (props) => {
  return (
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-1.5">
        <UserIcon class="size-4 text-background-30" />
        <Typography
          tag="p"
          textAlign="text-center"
          color="secondary"
          class="text-sm"
        >
          @{props.username}
        </Typography>
      </div>
      <Button
        variant="secondary"
        href={props.eventLink}
        class="min-h-10 px-4 py-2 text-sm rounded-lg"
      >
        <Typography tag="span" key="events.info" />
      </Button>
    </div>
  );
};

const EventCardImage: Component<{ src: string; alt: string }> = (props) => (
  <div class="-mx-4 -mt-4 w-[calc(100%+2rem)] overflow-hidden bg-background-40 no-interact rounded-none">
    <img
      src={props.src}
      loading="lazy"
      alt={props.alt}
      class="h-full w-full object-cover aspect-2/1"
    />
  </div>
);

const EventCard: Component<{
  event: DiscordEvent;
}> = (props) => {
  const e = props.event;
  const dates = getDates(e.startDate, e.recurrenceRule, 2);
  const day = dates.length > 0 ? getDayName(dates[0].getDay()) : "";

  const image = e.image
    ? `https://cdn.discordapp.com/guild-events/${e.id}/${e.image}.webp?size=512`
    : "/images/nighty_floating.webp";
  const link = `https://discord.com/events/${e.guild_id}/${e.id}`;

  return (
    <Container class="flex h-full flex-col gap-4 overflow-hidden">
      <EventCardImage src={image} alt={e.name} />
      <div class="flex flex-col gap-4 flex-1">
        <EventCardHeader
          name={e.name}
          location={e.entity_metadata.location}
          nextDate={dates[0]}
          startDate={e.startDate}
          endDate={e.endDate}
          day={day}
          recurrenceRule={e.recurrenceRule}
        />
        <div class="w-full h-px bg-background-40" />
        <EventCardDescription text={e.description} />
      </div>
      <div class="w-full h-px bg-background-40" />
      <EventCardBottomRow eventLink={link} username={e.username} />
      <div class="w-full h-px bg-background-40" />
      <EventCardUpcomingDates dates={dates} />
    </Container>
  );
};

export default EventCard;
