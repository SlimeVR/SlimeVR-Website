interface Env {
  DISCORD_GUILD_ID?: string;
  DISCORD_BOT_TOKEN?: string;
}

const formatEvent = (event: any) => ({
  id: event.id,
  guild_id: event.guild_id,
  name: event.name,
  description: event.description ?? "",
  scheduled_start_time: event.scheduled_start_time ?? "",
  scheduled_end_time: event.scheduled_end_time ?? null,
  recurrence_rule: event.recurrence_rule ?? null,
  image: event.image ?? null,
  entity_metadata: event.entity_metadata ?? { location: "" },
  creator: event.creator
    ? { username: event.creator.username ?? "" }
    : null,
});

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;
  const guildId = env.DISCORD_GUILD_ID;
  const token = env.DISCORD_BOT_TOKEN;
  const url = `https://discord.com/api/v10/guilds/${guildId}/scheduled-events`;

  if (!guildId || !token) {
    return Response.json(
      { error: "Missing DISCORD_GUILD_ID or DISCORD_BOT_TOKEN" },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60",
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`,
      },
    });

    if (!response.ok) {
      return Response.json([], {
        status: response.status,
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60",
          "Content-Type": "application/json",
        },
      });
    }

    const data = await response.json();
    const events = Array.isArray(data) ? data.map(formatEvent) : [];

    if (events.length === 0) {
      return Response.json([], {
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60",
          "Content-Type": "application/json",
        },
      });
    }

    return Response.json(events, {
      headers: {
        "Cache-Control":
          "public, max-age=21600, s-maxage=21600, stale-while-revalidate=86400",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch events from Discord", error);

    return Response.json([], {
      status: 500,
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "Content-Type": "application/json",
      },
    });
  }
};
