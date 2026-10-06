import { ParentComponent } from "solid-js";
import { Container, Typography } from "~/components/commons";

interface PressKitSectionProps {
  title: string;
}

export const PressKitSection: ParentComponent<PressKitSectionProps> = (
  props
) => (
  <div class="flex flex-col gap-4">
    <Typography tag="h2" variant="section-title" class="mb-1">
      {props.title}
    </Typography>
    {props.children}
  </div>
);
