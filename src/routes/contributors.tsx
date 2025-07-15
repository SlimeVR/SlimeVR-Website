import { Link, Meta } from "@solidjs/meta";
import { Component, ParentProps } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { SearchBox } from "~/components/contributors/SearchBox";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";
import { Card } from "~/components/contributors/Card";

export default function ContributorsLayout(props: ParentProps) {
  return (
    <MainLayout>
      <AppTitle key="contributors.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/" />
      <Section>
        <Container class="mt-4">
          <div class="flex flex-row justify-between items-center mb-8">
            <Typography
              tag="h2"
              variant="main-title"
              textAlign="text-center"
              key="contributors.title"
            />
            <Button
              variant="primary"
              href="https://github.com/SlimeVR/SlimeVR-Server/blob/main/CONTRIBUTING.md"
            >
              <Localized id="contributors.guide" />
            </Button>
          </div>
          <Typography
            tag="p"
            key="contributors.description"
            whitespace="whitespace-pre-line"
          />

          <div class="flex flex-row justify-between items-center mt-8">
            <SearchBox
              class="w-full max-w-60"
              onChange={(e) => {
                console.log(
                  `Search input changed: ${(e.currentTarget as HTMLInputElement).value}`
                );
              }}
            >
              <Localized id="contributors.search" />
            </SearchBox>
            <Button
              variant="quaternary"
              class="border border-background-40 !rounded-full"
              href="https://github.com/SlimeVR/SlimeVR-Server/blob/main/CONTRIBUTING.md"
            >
              <Localized id="contributors.shuffle" />
            </Button>
          </div>

          <div class="flex flex-row flex-wrap gap-4 mt-8 justify-around">
            {[...Array(25)].map((_, i) => (
              <Card
              name={`JovannMC`}
              roles={["artist", "dev", "founder"]}
              socials={{ /* TODO: socials */ }}
              image="/images/contrib-slime.png"
              tags={["Tag one", "Another tag", "Smol tag", "Tag four"]}
              background={{ /* TODO: background */ }}
              border={{ /* TODO: border */ }}
            />
            ))}
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
