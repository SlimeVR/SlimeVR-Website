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

export const getDates = (event: EventData, count = 4): Date[] => {
  const { startDate, recurrence } = event;
  if (!recurrence) return [new Date(startDate)];

  const interval = Math.max(recurrence.interval ?? 1, 1);
  const frequency = recurrence.frequency ?? "weekly";

  const dates: Date[] = [];
  let current = new Date(startDate);
  const now = new Date();

  while (current < now) current = advanceDate(current, frequency, interval);

  for (let i = 0; i < count; i++) {
    dates.push(new Date(current));
    current = advanceDate(current, frequency, interval);
  }

  return dates;
};

export const getNextDate = (event: EventData): Date => {
  if (event.recurrence) return getDates(event, 1)[0];
  return new Date(event.startDate);
};

export const sortByNextDate = (events: EventData[]): EventData[] => {
  return [...events].sort(
    (a, b) => getNextDate(a).getTime() - getNextDate(b).getTime()
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

export const fromDiscord = (raw: any): EventData => {
  const id = raw.id;
  const hash = raw.image ?? null;
  const rule = raw.recurrence_rule ?? null;
  const host = raw.creator?.username ? `@${raw.creator.username}` : "";

  return {
    id,
    name: raw.name,
    description: raw.description ?? "",
    location: raw.entity_metadata?.location ?? "",
    startDate: raw.scheduled_start_time ?? "",
    endDate: raw.scheduled_end_time ?? null,
    image: hash
      ? `https://cdn.discordapp.com/guild-events/${id}/${hash}.webp?size=512`
      : null,
    link:
      raw.guild_id != null
        ? `https://discord.com/events/${raw.guild_id}/${id}`
        : null,
    host,
    recurrence: rule
      ? {
          frequency: DISCORD_FREQUENCY[rule.frequency] ?? "weekly",
          interval: rule.interval ?? 1,
        }
      : null,
  };
};

export const getFallbackEvents = (): EventData[] => {
  if (!Array.isArray(testData)) return [];
  return testData.map(fromDiscord);
};
