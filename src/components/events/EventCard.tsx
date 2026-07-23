import {
  Component,
  For,
  Show,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";
import { CalendarIcon } from "~/components/commons/icons/CalendarIcon";
import { LocationIcon } from "~/components/commons/icons/LocationIcon";
import { UserIcon } from "~/components/commons/icons/UserIcon";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { useI18n } from "~/i18n";
import {
  formatDate,
  formatTimeShort,
  formatTimeLocal,
  getTimezone,
  getDayName,
  getEventSchedule,
  type EventData,
  type EventSchedule,
} from "~/utils/events";

const EventCardHeader: Component<{
  event: EventData;
  schedule: EventSchedule | null;
}> = (props) => {
  const event = props.event;
  const isRecurring = () => !!event.recurrence;

  return (
    <div class="grid gap-2">
      <Typography tag="h3" textAlign="text-left" variant="section-title">
        {event.name}
      </Typography>
      <div class="flex items-start justify-between gap-3">
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <Show when={props.schedule}>
            {(schedule) =>
              schedule().isLive ? (
                <EventLiveBadge
                  startDate={event.startDate}
                  date={schedule().date}
                  day={getDayName(schedule().date.getDay())}
                  isRecurring={isRecurring()}
                />
              ) : (
                <>
                  <EventNextDate
                    startDate={event.startDate}
                    date={schedule().date}
                  />
                  {isRecurring() ? (
                    <EventRecurringInfo
                      startDate={event.startDate}
                      day={getDayName(schedule().date.getDay())}
                    />
                  ) : (
                    <EventOneTimeInfo />
                  )}
                </>
              )
            }
          </Show>
        </div>
        <div class="flex h-5 shrink-0 items-center gap-1.5 self-start">
          <LocationIcon class="size-4 shrink-0 text-accent-background-20" />
          <Typography
            tag="span"
            color="secondary"
            class="text-sm wrap-break-word"
          >
            {event.location}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const EventCardDescription: Component<{ text: string }> = (props) => (
  <div class="h-24">
    <Typography tag="p" textAlign="text-left" class="line-clamp-4">
      {props.text}
    </Typography>
  </div>
);

const EventCardUpcomingDates: Component<{ dates: Date[] }> = (props) => (
  <div class="grid h-full content-start gap-1">
    <Typography
      tag="p"
      textAlign="text-left"
      color="secondary"
      key="events.upcoming"
    />
    <Show
      when={props.dates.length > 0}
      fallback={<Typography tag="p" key="events.no-dates" />}
    >
      <For each={props.dates}>
        {(date) => (
          <div class="flex items-center gap-2 text-background-10">
            <CalendarIcon class="size-4 text-background-30" />
            <Typography tag="span" textAlign="text-left" color="primary">
              {formatDate(date)} &bull; {formatTimeShort(date)}
            </Typography>
          </div>
        )}
      </For>
    </Show>
  </div>
);

const EventLiveBadge: Component<{
  startDate: string;
  date: Date;
  day: string;
  isRecurring: boolean;
}> = (props) => {
  const { translator } = useI18n();
  return (
    <div class="flex flex-col gap-1">
      <div
        class="flex h-5 items-center gap-2"
        title={`${formatDate(props.date)} \u2022 ${formatTimeShort(props.date)}`}
      >
        <span class="size-2 shrink-0 rounded-full bg-status-success" />
        <Typography
          tag="span"
          textAlign="text-left"
          color="primary"
          class="text-sm font-medium"
          key="events.live"
        />
      </div>
      {props.isRecurring && props.day ? (
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
      ) : (
        <EventOneTimeInfo />
      )}
    </div>
  );
};

const EventNextDate: Component<{
  startDate: string;
  date: Date;
}> = (props) => (
  <div class="flex h-5 items-center gap-2 text-background-10">
    <CalendarIcon class="size-4 shrink-0 text-accent-background-20" />
    <span
      title={`${formatTimeLocal(props.date)} ${getTimezone(props.startDate)}`}
    >
      <Typography tag="span" textAlign="text-left" color="primary">
        {formatDate(props.date)} &bull; {formatTimeShort(props.date)}
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

const EventOneTimeInfo: Component = () => (
  <Typography tag="p" color="secondary" class="text-xs" key="events.one-time" />
);

const EventCardBottomRow: Component<{
  link?: string | null;
  host?: string;
}> = (props) => {
  const hasLink = !!props.link;

  return (
    <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <div class="flex min-w-0 items-center gap-1.5">
        <Show when={props.host}>
          <UserIcon class="size-4 text-background-30" />
          <Typography
            tag="p"
            textAlign="text-center"
            color="secondary"
            class="text-sm truncate"
          >
            {props.host}
          </Typography>
        </Show>
      </div>
      <Button
        variant="primary"
        href={hasLink ? props.link! : undefined}
        rel="noopener noreferrer"
        target="_blank"
        disabled={!hasLink}
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

const EventCard: Component<{ event: EventData }> = (props) => {
  // prevent hydration mismatch like in contributors page
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const event = props.event;

  const schedule = createMemo(() =>
    mounted() ? getEventSchedule(event, 2) : null
  );

  const image = () => event.image ?? "/images/nighty_floating.webp";

  return (
    <Container class="grid h-full grid-rows-[auto_auto_auto_auto_auto_1fr] gap-4 overflow-hidden">
      <EventCardImage src={image()} alt={event.name} />
      <div class="grid gap-4">
        <EventCardHeader event={event} schedule={schedule()} />
        <div class="w-full h-px bg-background-40" />
        <EventCardDescription text={event.description} />
      </div>
      <div class="w-full h-px bg-background-40" />
      <EventCardBottomRow link={event.link} host={event.host} />
      <Show when={schedule()}>
        {(s) => (
          <>
            <div class="w-full h-px bg-background-40" />
            <EventCardUpcomingDates dates={s().upcoming} />
          </>
        )}
      </Show>
    </Container>
  );
};

export default EventCard;
