import { Component } from "solid-js";
import { Container, Typography } from "~/components/commons";

const UseCaseCard: Component<{ title: string; image: string; desc: string }> = (
  props
) => {
  return (
    <Container class="flex flex-col gap-4 sm:flex-row md:flex-col">
      <div class="sm:hidden md:block">
        <Typography
          tag="h3"
          variant="main-title"
          textAlign="text-center"
          key={props.title}
        />
      </div>
      <div class="no-interact flex h-52 items-center justify-center sm:w-fit sm:justify-start md:h-auto">
        <img
          src={props.image}
          loading="lazy"
          class="h-full sm:h-auto sm:w-full sm:p-8 md:p-0"
          alt={props.title}
        />
      </div>
      <div class="flex flex-col sm:w-full sm:justify-center sm:gap-4">
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
      <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
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
