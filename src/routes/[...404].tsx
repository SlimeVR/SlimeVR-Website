import { Meta } from "@solidjs/meta";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { Container } from "~/components/commons/Container";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <Section>
        <Meta name="robots" content="noindex, nofollow" />
        <Container class="mt-4">
          <Typography tag="h1" variant="main-title">
            Page not found
          </Typography>
          <div class="flex justify-center">
            <img src="/images/sad-slime.gif"></img>
          </div>
          <ArrowButton href="/">Go back to the home page</ArrowButton>
        </Container>
      </Section>
    </MainLayout>
  );
}
