import { EventData, getFallbackEvents, toEventData } from "~/features/events/utils/events";

export const fetchEvents = async (): Promise<EventData[]> => {
  if (import.meta.env.DEV) {
    console.log("Development environment, using fallback events");
    return getFallbackEvents();
  }

  try {
    const response = await fetch("/api/events");

    const status = response.status;
    if (status === 404) console.warn("no events returned");
    if (status === 500) console.error("server error fetching events");
    if (!response.ok) {
      throw new Error(`Failed to fetch events: [${response.status}] ${response.statusText}`);
    }

    const result = (await response.json()) as unknown[];
    return result.map(toEventData);
  } catch (error) {
    const msg = (error as Error).message;
    console.error(`Failed to fetch events: ${msg}`);
    return [];
  }
};
