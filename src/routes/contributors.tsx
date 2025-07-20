import { Link, Meta } from "@solidjs/meta";
import { Component, createSignal, ParentProps } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { SearchBox } from "~/components/contributors/SearchBox";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";
import { Card } from "~/components/contributors/Card";
import { contributors } from "~/components/contributors";

const socialsPriority = [
  "website",
  "discord",
  "matrix",
  "github",
  "youtube",
  "twitch",
  "twitter",
  "bluesky",
  "instagram",
  "tiktok",
  "steam",
  "printables",
  "kofi",
];

const contribs = contributors
  .slice()
  // sort alphabetically by name
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((contributor) => {
    if (contributor.socials) {
      // sort socials by priority
      // i don't feel like sorting it in the object manually lmao, kill me if you want to -maya
      const sortedEntries = Object.entries(contributor.socials).sort(
        ([a], [b]) => {
          const aIndex = socialsPriority.indexOf(a);
          const bIndex = socialsPriority.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        }
      );
      contributor.socials = Object.fromEntries(sortedEntries);
    }
    return contributor;
  });

const [finalContribs, setFinalContribs] = createSignal(contribs);
const [searchTerm, setSearchTerm] = createSignal("");
const [isShuffling, setIsShuffling] = createSignal(false);

const maxShuffles = 7;
function shuffle() {
  setIsShuffling(true);

  let shuffleCount = 0;
  const shuffleInterval = setInterval(() => {
    setFinalContribs([...contribs].sort(() => Math.random() - 0.5));
    shuffleCount++;

    if (shuffleCount >= maxShuffles) {
      clearInterval(shuffleInterval);
      setIsShuffling(false);
    }
  }, 100);
}

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
              onChange={(e) =>
                setSearchTerm((e.currentTarget as HTMLInputElement).value)
              }
            >
              <Localized id="contributors.search" />
            </SearchBox>
            <Button
              variant="quaternary"
              class="border border-background-40 !rounded-full"
              onClick={shuffle}
            >
              <Localized id="contributors.shuffle" />
            </Button>
          </div>

          <div class="flex flex-row flex-wrap gap-4 mt-8 justify-around">
            {/* filter slimes by search term if exists */}
            {finalContribs()
              .filter((contrib) =>
                contrib.name.toLowerCase().includes(searchTerm().toLowerCase())
              )
              .map((contrib, i) => {
                // ! this is just placeholder stuff, to replace with actual colours for slimes
                const gradient =
                  "linear-gradient(292.18deg, #FA5858 -0.23%, #FFFFFF 4.63%, #FFD324 9.49%, #02FFD5 14.35%, #FFFFFF 19.22%, #A200FF 24.08%, #0077FF 28.94%, #00FFAE 33.81%, #FBFFC7 38.67%, #FA5858 43.53%, #FF7700 48.4%, #FFFFFF 53.26%, #FFF47B 58.12%, #FBFFC7 62.99%, #FFFFFF 67.85%, #CDFFC7 72.71%, #5BFAFF 77.58%, #FF82CD 82.44%, #E34B4B 87.3%, #FBFFC7 97.03%)";

                const isGradientCard = i % 3 === 2;

                return (
                  <Card
                    class={`transition-all duration-200 ${
                      isShuffling()
                        ? "animate-pulse scale-95 opacity-80 transform rotate-1 pointer-events-none"
                        : "scale-100 opacity-100 transform rotate-0"
                    }`}
                    contributor={contrib}
                    background={isGradientCard ? gradient : "#d9d9d9"}
                    border={isGradientCard ? gradient : "#d9d9d9"}
                  />
                );
              })}
            {/* if none found, show sad message */}
            {finalContribs().filter((contrib) =>
              contrib.name.toLowerCase().includes(searchTerm().toLowerCase())
            ).length === 0 && <Localized id="contributors.none" />}
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
