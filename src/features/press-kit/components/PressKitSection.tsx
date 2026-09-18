import { ParentComponent } from "solid-js";
import { Container, Typography } from "~/components/commons";

interface PressKitSectionProps {
  title: string;
}

export const PressKitSection: ParentComponent<PressKitSectionProps> = (
  props
) => {
  <Container class="flex flex-col gap-4">
    <Typography tag="h2" variant="main-title">
      {props.title}
    </Typography>
    {props.children}
  </Container>;
};
