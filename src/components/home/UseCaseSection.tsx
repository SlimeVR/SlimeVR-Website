import { Component } from "solid-js";
import { Typography } from "../commons/Typography";
import { Container } from "../commons/Container";

const UseCaseCard: Component<{ title: string; image: string; desc: string }> = (
  props
) => {
  return (
    <Container class="gap-4 flex flex-col sm:flex-row md:flex-col">
      <div class="sm:hidden md:block">
        <Typography
          tag="h3"
          variant="main-title"
          textAlign="text-center"
          key={props.title}
        />
      </div>
      <div class="flex justify-center items-center sm:justify-start h-52 md:h-auto no-interact sm:w-fit">
        <img
          src={props.image}
          loading="lazy"
          class="h-full sm:w-full sm:h-auto sm:p-8 md:p-0"
          alt={props.title}
        />
      </div>
      <div class="flex flex-col sm:gap-4 sm:justify-center sm:w-full">
        <div class="hidden sm:block md:hidden">
          <Typography
            tag="h3"
            variant="main-title"
            textAlign="text-center"
            key={props.title}
          />
        </div>
        <Typography tag="p" key={props.desc} />
      </div>
    </Container>
  );
};

export const UseCaseSection: Component = () => {
  return (
    <div class="flex flex-col items-center gap-4">
      <Typography tag="h2" variant="main-title" key="home.use-cases.title" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <UseCaseCard
          title="home.use-cases.vr.title"
          image="/images/vr.webp"
          desc="home.use-cases.vr.desc"
        ></UseCaseCard>
        <UseCaseCard
          title="home.use-cases.vtubing.title"
          image="/images/vtubing.webp"
          desc="home.use-cases.vtubing.desc"
        ></UseCaseCard>
        <UseCaseCard
          title="home.use-cases.motion-capture.title"
          image="/images/mocap.webp"
          desc="home.use-cases.motion-capture.desc"
        ></UseCaseCard>
      </div>
    </div>
  );
};
