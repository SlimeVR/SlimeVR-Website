import { Component, For } from "solid-js";
import { Typography } from "~/components/commons/Typography";
import { DiscordEvent } from "~/utils/server";
import EventCard from "~/components/events/EventCard";

const EventSection: Component<{
  titleKey: string;
  events: DiscordEvent[];
}> = (props) => (
  <div class="flex flex-col mt-8 gap-4">
    <Typography tag="h2" variant="section-title" key={props.titleKey} />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <For each={props.events}>
        {(event) => <EventCard event={event} />}
      </For>
    </div>
  </div>
);

export default EventSection;
