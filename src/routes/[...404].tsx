import { HttpStatusCode } from "@solidjs/start";
import { Meta } from "@solidjs/meta";
import { Typography, ArrowButton, Container } from "~/components/commons";
import { MainLayout, Section } from "~/components/layout";

export default function NotFound() {
  return (
    <MainLayout>
      <Section>
        <HttpStatusCode code={404} />
        <Meta name="robots" content="noindex, nofollow" />
        <Container class="mt-4">
          <Typography tag="h1" variant="main-title">
            Page not found
          </Typography>
          <div class="flex justify-center">
            <img src="/images/sad-slime.gif" alt="Sad slime"></img>
          </div>
          <ArrowButton href="/">Go back to the home page</ArrowButton>
        </Container>
      </Section>
    </MainLayout>
  );
}
