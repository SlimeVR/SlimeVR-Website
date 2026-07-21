import { DiscordEvent } from "~/utils/server";

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
