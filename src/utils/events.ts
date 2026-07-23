import testData from "./local-events.json";

export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export type Recurrence = {
  frequency: Frequency;
  interval?: number; // space between occurrences - e.g for weekly: 1 for every week, 2 for every 2 weeks, etc.
} | null;

export interface EventData {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  image?: string | null;
  link?: string | null;
  host?: string;
  recurrence?: Recurrence;
}

const DISCORD_FREQUENCY: Record<number, Frequency> = {
  0: "yearly",
  1: "monthly",
  2: "weekly",
  3: "daily",
};

export const advanceDate = (
  date: Date | string,
  frequency: Frequency,
  interval: number
) => {
  const next = new Date(date);
  switch (frequency) {
    case "daily":
      next.setDate(next.getDate() + interval);
      break;
    case "weekly":
      next.setDate(next.getDate() + interval * 7);
      break;
    case "monthly":
      next.setMonth(next.getMonth() + interval);
      break;
    case "yearly":
      next.setFullYear(next.getFullYear() + interval);
      break;
  }
  return next;
};

export type EventSchedule = {
  date: Date;
  isLive: boolean;
  upcoming: Date[];
};

// duration of event
const getDurationMs = (event: EventData): number => {
  if (!event.endDate || !event.startDate) return 0;
  const duration =
    new Date(event.endDate).getTime() - new Date(event.startDate).getTime();
  return duration > 0 ? duration : 0;
};

export const getEventSchedule = (
  event: EventData,
  upcomingCount = 2,
  now: Date = new Date()
): EventSchedule => {
  const nowMs = now.getTime();
  const durationMs = getDurationMs(event);
  const start = new Date(event.startDate);

  // one-time event
  if (!event.recurrence) {
    const isLive =
      durationMs > 0 &&
      nowMs >= start.getTime() &&
      nowMs <= start.getTime() + durationMs;

    return {
      date: start,
      isLive,
      // only include upcoming if the event hasn't ended yet
      upcoming: nowMs < start.getTime() ? [start] : [],
    };
  }

  // recurring event
  const interval = Math.max(event.recurrence.interval ?? 1, 1);
  const frequency = event.recurrence.frequency ?? "weekly";

  let date = new Date(start);
  while (date.getTime() + durationMs < nowMs)
    date = advanceDate(date, frequency, interval);

  // if the event is currently live, use the current occurrence as the date
  const isLive =
    durationMs > 0 &&
    nowMs >= date.getTime() &&
    nowMs <= date.getTime() + durationMs;

  // upcoming occurrences
  let next = new Date(date);
  if (isLive || next.getTime() <= nowMs)
    next = advanceDate(next, frequency, interval);
  while (next.getTime() <= nowMs) next = advanceDate(next, frequency, interval);

  const upcoming: Date[] = [];
  for (let i = 0; i < upcomingCount; i++) {
    upcoming.push(new Date(next));
    next = advanceDate(next, frequency, interval);
  }

  return { date, isLive, upcoming };
};

export const sortByNextDate = (events: EventData[]): EventData[] => {
  return [...events].sort(
    (a, b) =>
      getEventSchedule(a, 0).date.getTime() -
      getEventSchedule(b, 0).date.getTime()
  );
};

export const filterUpcoming = (events: EventData[]): EventData[] => {
  const now = Date.now();
  return events.filter((event) => {
    if (event.recurrence) return true;
    const end = event.endDate
      ? new Date(event.endDate).getTime()
      : new Date(event.startDate).getTime();
    return end >= now;
  });
};

export const getDayName = (day: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + day);
  return date.toLocaleDateString("en", { weekday: "long" });
};

export const formatDate = (date: Date | string) => {
  const localDate = new Date(date);
  return localDate.toLocaleString("en", { dateStyle: "long" });
};

// 24h time
export const formatTimeShort = (date: Date | string) => {
  const localDate = new Date(date);
  return localDate.toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// time dependant on user locale (12h or 24h)
export const formatTimeLocal = (date: Date | string) => {
  const localDate = new Date(date);
  return localDate.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "2-digit",
  });
};

let cachedTimezone: string | null = null;
export const getTimezone = (date: Date | string) => {
  if (cachedTimezone) return cachedTimezone;
  const localDate = new Date(date);
  cachedTimezone =
    new Intl.DateTimeFormat("en", { timeZoneName: "short" })
      .formatToParts(localDate)
      .find((part) => part.type === "timeZoneName")
      ?.value.replace("GMT", "UTC") ?? "";
  return cachedTimezone;
};

export const toEventData = (event: any): EventData => {
  const id = event.id as string;

  const startDate = event.scheduled_start_time ?? event.startDate ?? "";
  const endDate = event.scheduled_end_time ?? event.endDate ?? null;
  const rule = event.recurrence_rule ?? event.recurrenceRule ?? null;
  const username = event.creator?.username ?? event.username ?? "";
  const host = username ? `@${username}` : "";

  const interval = Math.max(rule?.interval ?? 1, 1);
  const recurrence =
    rule?.frequency !== undefined && rule?.frequency !== null
      ? {
          frequency:
            DISCORD_FREQUENCY[rule.frequency as 0 | 1 | 2 | 3] ?? "weekly",
          interval,
        }
      : null;

  const rawImage = event.image ?? null;
  const isUrl =
    rawImage?.startsWith("http://") || rawImage?.startsWith("https://");
  const image = !rawImage
    ? null
    : isUrl
      ? rawImage
      : `https://cdn.discordapp.com/guild-events/${id}/${rawImage}.webp?size=512`;

  const link =
    event.guild_id != null
      ? `https://discord.com/events/${event.guild_id}/${id}`
      : (event.link ?? null);

  return {
    id,
    name: event.name ?? "",
    description: event.description ?? "",
    location: event.entity_metadata?.location ?? event.location ?? "",
    startDate,
    endDate,
    image,
    link,
    host,
    recurrence,
  };
};

export const getFallbackEvents = (): EventData[] => {
  if (!Array.isArray(testData)) return [];
  return testData.map(toEventData);
};
