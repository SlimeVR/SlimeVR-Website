import { Action, action } from "@solidjs/router";
import testData from "./events.json";

// TODO: will be moved to a cloudflare worker to add caching and stuff

const getEvents = async () => {
  // const id = import.meta.env.VITE_DISCORD_GUILD_ID;
  // const token = process.env.DISCORD_BOT_TOKEN;

  // console.log("getting events for guild id: " + id);

  // const data = await fetch(
  //   `https://discord.com/api/v10/guilds/${id}/scheduled-events?with_user_count=true`,
  //   {
  //     headers: {
  //       Authorization: `Bot ${token}`,
  //     },
  //   }
  // );

  // if (!data.ok) {
  //   console.error("Failed to fetch events from Discord API");
  //   return [];
  // }

  // const events = await data.json();
  // return events;

  return testData;
};

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

export const getEventsAction: () => Action<[], DiscordEvent[]> = () =>
  action(async () => {
    "use server";

    const events = await getEvents();

    const formattedEvents = events.map((event) => {
      return {
        id: event.id,
        guild_id: event.guild_id,
        username: event.creator.username,
        name: event.name,
        description: event.description,
        startDate: event.scheduled_start_time,
        endDate: event.scheduled_end_time,
        recurrenceRule: event.recurrence_rule,
        image: event.image,
        entity_metadata: event.entity_metadata,
      };
    });

    return formattedEvents;
  });
