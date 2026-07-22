import { filterUpcoming, type EventData } from "~/utils/events";

// id isn't really used rn as its just from discord events. might be used in future, but can be anything
// startDate/endDate is in UTC in format YYYY-MM-DDTHH:mm:ssZ
// endDate, recurrence, image, and link are optional
// see events.ts for type definitions

export const customEvents: EventData[] = [
  {
    id: "1",
    name: "Slime Cave Party",
    description: "nighty cooking some stuff in the slime cave :3",
    location: "Cave",
    startDate: "2026-09-15T14:00:00Z",
    endDate: "2026-09-15T18:00:00Z",
    image: "/images/mocap.webp",
    host: "SlimeVR",
  },
  {
    id: "2",
    name: "SlimeVR Live",
    description:
      "something something meower live stream",
    location: "YouTube",
    startDate: "2026-10-01T18:00:00Z",
    endDate: null,
    image: "/images/slimevr_desktop.webp",
    link: "https://www.youtube.com/@SlimeVR",
    host: "SlimeVR",
    recurrence: {
      frequency: "weekly",
      interval: 1,
    },
  },
];

export const getCustomEvents = (): EventData[] => filterUpcoming(customEvents);
