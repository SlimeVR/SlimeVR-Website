import testData from "./events.json";

export interface DiscordEvent {
  id: string;
  guild_id: string;
  username: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  recurrenceRule: {
    start: string;
    end: string | null;
    frequency: number;
    interval: number;
    by_weekday: number[] | null;
    by_n_weekday: any | null;
    by_month: any | null;
    by_month_day: any | null;
    by_year_day: any | null;
    count: any | null;
  } | null;
  image: string | null;
  entity_metadata: {
    location: string;
  };
}

export const FREQUENCY = {
  YEARLY: 0,
  MONTHLY: 1,
  WEEKLY: 2,
  DAILY: 3,
} as const;

export const advanceDate = (
  date: Date | string,
  frequency: number,
  interval: number
) => {
  const next = new Date(date);
  switch (frequency) {
    case FREQUENCY.DAILY:
      next.setDate(next.getDate() + interval);
      break;
    case FREQUENCY.WEEKLY:
      next.setDate(next.getDate() + interval * 7);
      break;
    case FREQUENCY.MONTHLY:
      next.setMonth(next.getMonth() + interval);
      break;
    case FREQUENCY.YEARLY:
      next.setFullYear(next.getFullYear() + interval);
      break;
  }
  return next;
};

export const getDates = (
  startDate: string,
  rule: DiscordEvent["recurrenceRule"] | null,
  count = 4
): Date[] => {
  if (!rule) return [new Date(startDate)];

  const interval = Math.max(rule.interval ?? 1, 1);
  const frequency = rule.frequency ?? FREQUENCY.WEEKLY;
  const limit = Math.min(count, rule.count ?? count);

  const dates: Date[] = [];
  let current = new Date(startDate);
  const now = new Date();

  while (current < now) {
    current = advanceDate(current, frequency, interval);
  }

  for (let i = 0; i < limit; i++) {
    dates.push(new Date(current));
    current = advanceDate(current, frequency, interval);
  }

  return dates;
};

export const getNextEventDate = (event: DiscordEvent): Date => {
  if (event.recurrenceRule) {
    const dates = getDates(event.startDate, event.recurrenceRule, 1);
    return dates[0];
  }
  return new Date(event.startDate);
};

export const sortByNextDate = (events: DiscordEvent[]): DiscordEvent[] => {
  return [...events].sort((a, b) => {
    const dateA = getNextEventDate(a).getTime();
    const dateB = getNextEventDate(b).getTime();
    return dateA - dateB;
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

export const getTimezone = (date: Date | string) => {
  const localDate = new Date(date);

  return (
    new Intl.DateTimeFormat("en", {
      timeZoneName: "short",
    })
      .formatToParts(localDate)
      .find((part) => part.type === "timeZoneName")
      ?.value.replace("GMT", "UTC") ?? ""
  );
};

/*
 * cloudflare functions stuff
 */

export const formatEvent = (event: any): DiscordEvent => ({
  id: event.id,
  guild_id: event.guild_id,
  username: event.creator?.username ?? "",
  name: event.name,
  description: event.description ?? "",
  startDate: event.scheduled_start_time ?? event.startDate ?? "",
  endDate: event.scheduled_end_time ?? event.endDate ?? null,
  recurrenceRule: event.recurrence_rule ?? null,
  image: event.image ?? null,
  entity_metadata: event.entity_metadata ?? { location: "" },
});

export const getFallbackEvents = (): DiscordEvent[] => {
  if (!Array.isArray(testData)) {
    return [];
  }

  return testData.map(formatEvent);
};
