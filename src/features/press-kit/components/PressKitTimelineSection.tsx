import { Typography } from "~/components/commons";
import { PressKitSection } from "./PressKitSection";
import { Component, For } from "solid-js";

const timeline = [
  {
    date: "2020",
    text: "Eiren and Polymoria started the project. The server and Wi-Fi tracker firmware repositories were created.",
  },
  {
    date: "Dec, 2020",
    text: "SlimeVR Discord Server was created.",
  },
  {
    date: "Aug 31, 2021",
    text: "SlimeVR Wi-Fi Trackers Crowd Supply campaign started.",
  },
  {
    date: "Dec 29, 2021",
    text: "Chip shortage and COVID-19 hit the project.",
  },
  {
    date: "Oct 12, 2022",
    text: "7950 out of 32,000 required BNO085 (IMU) were secured.",
  },
  {
    date: "Mar, 2023",
    text: "SlimeVR Wi-Fi Trackers DIY kits have started shipping.",
  },
  {
    date: "Mar, 2023",
    text: "sctanf began work on Smol slimes, creating repositories for the tracker and receiver.",
  },
  {
    date: "Jul 12, 2023",
    text: "SlimeVR Wi-Fi Trackers started shipping.",
  },
  {
    date: "May 23, 2025",
    text: "The last 734 sets of SlimeVR 1.0 and 1.1 have been shipped. v1.2 version of Wi-Fi trackers started shipping.",
  },
  {
    date: "Feb, 2026",
    text: "The SlimeVR Butterfly Trackers Campaign started and was fully funded in 30 hours.",
  },
  {
    date: "May 21, 2026",
    text: "SlimeVR Server was released on Steam.",
  },
];

export const PressKitTimelineSection: Component = () => (
  <PressKitSection title="Project Timeline">
    <ul class="list-disc pl-5 flex flex-col gap-2">
      <For each={timeline}>
        {(entry) => (
          <li>
            <Typography tag="span" bold>
              {entry.date}
            </Typography>
            <Typography tag="p">{entry.text}</Typography>
          </li>
        )}
      </For>
    </ul>
  </PressKitSection>
);
