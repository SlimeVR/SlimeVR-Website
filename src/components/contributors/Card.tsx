import clsx from "clsx";
import {
  ComponentProps,
  createMemo,
  mergeProps,
  ParentComponent,
} from "solid-js";
import CircularIcon from "./CircularIcon";
import { DevIcon } from "../commons/icons/DevIcon";
import { ArtistIcon } from "../commons/icons/ArtistIcon";
import { FounderIcon } from "../commons/icons/FounderIcon";
import { Typography } from "../commons/Typography";

interface Socials {
  // TODO: socials structure
}

interface Background {
  // TODO: background structure
}

interface Border {
  // TODO: border structure
}

interface CardProps extends ComponentProps<"div"> {
  name: string;
  roles: ("dev" | "artist" | "founder")[];
  socials: Socials;
  image: string;
  tags: string[];
  background: Background;
  border: Border;
}

export const Card: ParentComponent<CardProps> = (initialProps) => {
  const props = mergeProps({} satisfies Partial<CardProps>, initialProps);

  const classes = createMemo(() => {
    return clsx(
      "max-w-[250px] max-h-[348px] w-full h-full p-2 bg-background-60 shadow-lg flex flex-col items-center aspect-[0.72/1]",
      "",
      props.class
    );
  });

  return (
    // TODO: background and border styles
    <div class={classes() + "bg-background-40 rounded-2xl shadow-lg"}>
      <div class="aspect-[0.71/1] max-w-[237px] max-h-[336px] w-full h-full bg-background-40 flex flex-col items-center justify-evenly rounded-xl px-2">
        {/* card header - name, role(s), image */}
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <Typography
              tag="h3"
              variant="section-title"
              color="text-background-90"
            >
              {props.name}
            </Typography>
            {/* TODO: scale with card size */}
            <div class="flex flex-row -space-x-2.5">
              {props.roles.includes("dev") && (
                <CircularIcon size={32} class="z-0">
                  <DevIcon size={22} />
                </CircularIcon>
              )}
              {props.roles.includes("artist") && (
                <CircularIcon size={32} class="z-10">
                  <ArtistIcon size={22} />
                </CircularIcon>
              )}
              {props.roles.includes("founder") && (
                <CircularIcon size={32} class="z-20">
                  <FounderIcon size={22} />
                </CircularIcon>
              )}
            </div>
          </div>
          {/* card image - bg and slime photo */}
          <div class="w-full rounded-2xl rounded-tr-[70px] pattern">
            <img
              src={props.image}
              alt={props.name}
              class="object-cover h-full"
            />
          </div>
        </div>

        {/* card info/footer*/}
        <div class="flex flex-col items-center gap-4">
          {/* socials */}
          <div class="flex flex-row flex-wrap gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <CircularIcon size={30}>
                <ArtistIcon size={20} />
              </CircularIcon>
            ))}
          </div>
          {/* tags */}
          <div class="flex flex-row flex-wrap gap-2 justify-center">
            {props.tags.map((tag, i) => (
              <span class="bg-background-10 opacity-80 text-background-90 px-4 py-1.5 text-xs rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
