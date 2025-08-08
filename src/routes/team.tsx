import { Link, Meta } from "@solidjs/meta";
import Rand from "rand-seed";
import clsx from "clsx";
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Button } from "~/components/commons/Button";
import { Container } from "~/components/commons/Container";
import { ShuffleIcon } from "~/components/commons/icons/ShuffleIcon";
import { Typography } from "~/components/commons/Typography";
import { Contributor, contributors } from "~/components/contributors";
import { Card } from "~/components/contributors/Card";
import { SearchBox } from "~/components/contributors/SearchBox";
import { Sponsor, SponsorCard, PastSponsorAvatar } from "~/components/sponsors";
import { Section } from "~/components/Section";
import { Localized } from "~/i18n";
import { MainLayout } from "~/layouts/MainLayout";
import { DevIcon } from "~/components/commons/icons/DevIcon";
import { ArtistIcon } from "~/components/commons/icons/ArtistIcon";
import { PeopleIcon } from "~/components/commons/icons/PeopleIcon";
import CircularIcon from "~/components/contributors/CircularIcon";
import { useI18n } from "~/i18n";
import { setScroll } from "~/utils/scrollbar";

// constants
const SHINY_COUNT = 5;
const MAX_SHUFFLES = 7;
const SHUFFLE_INTERVAL = 150;
const SHINY_GRADIENT =
  "linear-gradient(292.18deg, #FA5858 -0.23%, #FFFFFF 4.63%, #FFD324 9.49%, #02FFD5 14.35%, #FFFFFF 19.22%, #A200FF 24.08%, #0077FF 28.94%, #00FFAE 33.81%, #FBFFC7 38.67%, #FA5858 43.53%, #FF7700 48.4%, #FFFFFF 53.26%, #FFF47B 58.12%, #FBFFC7 62.99%, #FFFFFF 67.85%, #CDFFC7 72.71%, #5BFAFF 77.58%, #FF82CD 82.44%, #E34B4B 87.3%, #FBFFC7 97.03%)";

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

const sortedContribs = contributors
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

// fetch sponsors from GitHub GraphQL API
async function fetchSponsors(): Promise<{
  active: Sponsor[];
  past: Sponsor[];
  envMissing: boolean;
}> {
  const authToken = import.meta.env.VITE_GITHUB_AUTH_TOKEN;
  const org = import.meta.env.VITE_GITHUB_ORG;

  if (!authToken || !org) {
    console.warn(
      "GitHub auth token or organization name not configured - hiding sponsors section"
    );
    return { active: [], past: [], envMissing: true };
  }

  try {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `token ${authToken}`,
      },
      body: JSON.stringify({
        query: `query SponsorQuery {
          organization(login: "${org}") {
            sponsorshipsAsMaintainer(first: 100, includePrivate: false, activeOnly: false) {
              edges {
                node {
                  isActive
                  sponsor {
                    ... on Sponsorable {
                      ... on User {
                        name
                        login
                        url
                        avatarUrl
                      }
                      ... on Organization {
                        name
                        login
                        url
                        avatarUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (response && response.ok) {
      const data = await response.json();
      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        return { active: [], past: [], envMissing: false };
      }

      const sponsorships =
        data.data.organization.sponsorshipsAsMaintainer.edges;
      const activeSponsors: Sponsor[] = [];
      const pastSponsors: Sponsor[] = [];

      sponsorships.forEach((edge: any) => {
        const sponsor = {
          name: edge.node.sponsor.name || edge.node.sponsor.login,
          url: edge.node.sponsor.url,
          avatarUrl: edge.node.sponsor.avatarUrl,
        };

        if (edge.node.isActive) {
          activeSponsors.push(sponsor);
        } else {
          pastSponsors.push(sponsor);
        }
      });

      return { active: activeSponsors, past: pastSponsors, envMissing: false };
    }

    console.error("Failed to fetch sponsors:", response.status);
    return { active: [], past: [], envMissing: false };
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return { active: [], past: [], envMissing: false };
  }
}

// random "shiny" slimes (5 per day), where it is seeded by the current date (so everyone gets the same shinies)
function getShinyContribs(contribs: Contributor[], count = SHINY_COUNT) {
  const seed = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const rand = new Rand(seed);
  const slimes = contribs.slice();
  // Fisher-Yates shuffle algorithm
  for (let i = slimes.length - 1; i > 0; i--) {
    const j = Math.floor(rand.next() * (i + 1));
    [slimes[i], slimes[j]] = [slimes[j], slimes[i]];
  }

  const finalSlimes = slimes.slice(0, count);
  console.log(
    `Shiny slimes for ${seed}:`,
    finalSlimes.map((s) => s.name)
  );
  return finalSlimes;
}

const [finalContribs, setFinalContribs] = createSignal(sortedContribs);
const [searchTerm, setSearchTerm] = createSignal("");
const [isShuffling, setIsShuffling] = createSignal(false);

// cache for images to load during shuffles/searches (because they are re-rendered during those)
const imageCache = new Map<
  string,
  { src: string; classes: string; error: boolean }
>();
const preloadImage = (name: string, classes?: string): Promise<void> => {
  return new Promise((resolve) => {
    if (imageCache.has(name)) {
      resolve();
      return;
    }

    const image = new Image();
    image.src = `images/contributors/${name.toLowerCase()}.webp`;
    image.onload = () => {
      imageCache.set(name, {
        src: image.src,
        classes: clsx(
          "object-contain w-[calc(100%+16px)] scale-[103%] select-none",
          classes
        ),
        error: false,
      });
      resolve();
    };
    image.onerror = () => {
      imageCache.set(name, {
        src: `images/contributors/jovannmc.webp`, // fallback
        classes:
          "object-contain w-[calc(100%+16px)] scale-[103%] select-none brightness-[0.01]",
        error: true,
      });
      resolve();
    };
  });
};

function shuffle() {
  if (isShuffling()) return;
  setIsShuffling(true);

  let shuffleCount = 0;
  const shuffleInterval = setInterval(() => {
    setFinalContribs([...sortedContribs].sort(() => Math.random() - 0.5));
    shuffleCount++;

    if (shuffleCount >= MAX_SHUFFLES) {
      clearInterval(shuffleInterval);
      setTimeout(() => {
        setIsShuffling(false);
      }, SHUFFLE_INTERVAL);
    }
  }, SHUFFLE_INTERVAL);
}

export default function TeamPage(props: ParentProps) {
  const { translator } = useI18n();

  const [focusedCard, setFocusedCard] = createSignal<string | null>(null);
  const [sponsors] = createResource(fetchSponsors);

  const isFirefox = createMemo(() => {
    if (typeof window === "undefined") return false;
    return navigator.userAgent.toLowerCase().includes("firefox");
  });

  const activeSponsors = createMemo(() => sponsors()?.active ?? []);
  const pastSponsors = createMemo(() => sponsors()?.past ?? []);
  const envMissing = createMemo(() => sponsors()?.envMissing ?? false);
  const activeCount = createMemo(() => activeSponsors().length);
  const pastCount = createMemo(() => pastSponsors().length);
  const shinyContribs = createMemo(() =>
    getShinyContribs(sortedContribs, SHINY_COUNT)
  );
  const filteredContribs = createMemo(() =>
    finalContribs().filter((contrib) =>
      contrib.name.toLowerCase().includes(searchTerm().toLowerCase())
    )
  );

  const handleCardClick = (contributorName: string) => {
    if (focusedCard() !== contributorName) setFocusedCard(contributorName);
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && focusedCard()) setFocusedCard(null);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!focusedCard()) return;

    const target = e.target as HTMLElement;
    const clickedCard = target.closest("[data-card-name]");
    if (!clickedCard) setFocusedCard(null);
  };

  // prevent scrolling when a card is focused
  // doing it here "fixes" the weird issue where you can scroll after focusing a second card without unfocusing first
  // ..i don't know either but it works -maya
  createEffect(() => {
    if (focusedCard()) {
      setScroll(false);
    } else {
      setTimeout(() => {
        setScroll(true);
      }, 450); // same as transition duration in Card.tsx
    }
  });

  onMount(() => {
    if (typeof window === "undefined") return;
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mouseup", handleClickOutside);

    // preload all contributor images
    sortedContribs.forEach((contrib) => {
      preloadImage(contrib.name, contrib.classes);
    });
  });

  onCleanup(() => {
    if (typeof window === "undefined") return;
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("mouseup", handleClickOutside);
  });

  return (
    <MainLayout>
      <AppTitle key="contributors.title"></AppTitle>
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/" />
      <Link
        rel="preload"
        fetchpriority="high"
        as="image"
        href="/images/contributors/jovannmc.webp"
        type="image/webp"
      />
      {/* contributors section */}
      <Section>
        <Container class="mt-4">
          {/* section text */}
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

          {/* roles legend */}
          <div
            class={clsx(
              "flex flex-col gap-4 mt-6 p-4 bg-background-70 border border-background-40 rounded-xl text-center",
              "sm:flex-row sm:text-left"
            )}
          >
            <Typography tag="h3" variant="section-title">
              <Localized id="contributors.roles.title" />
            </Typography>
            <div class="flex flex-wrap justify-evenly gap-4">
              <div class="flex items-center gap-2">
                <CircularIcon size={28}>
                  <DevIcon size={20} />
                </CircularIcon>
                <Typography tag="span" variant="standard">
                  <Localized id="contributors.roles.developer" />
                </Typography>
              </div>
              <div class="flex items-center gap-2">
                <CircularIcon size={28}>
                  <PeopleIcon size={22} />
                </CircularIcon>
                <Typography tag="span" variant="standard">
                  <Localized id="contributors.roles.community" />
                </Typography>
              </div>
              <div class="flex items-center gap-2">
                <CircularIcon size={28}>
                  <ArtistIcon size={18} />
                </CircularIcon>
                <Typography tag="span" variant="standard">
                  <Localized id="contributors.roles.artist" />
                </Typography>
              </div>
            </div>
          </div>

          {/* poge actions - search & shuffle */}
          <div class="flex flex-row justify-between gap-4 items-center mt-8">
            <SearchBox
              class="w-full sm:max-w-60"
              onChange={(e) =>
                setSearchTerm((e.currentTarget as HTMLInputElement).value)
              }
            >
              <Localized id="contributors.search" />
            </SearchBox>
            <Button
              variant="quaternary"
              class="border border-background-40 !rounded-full !p-2.5 sm:!px-5 sm:!py-2.5"
              onClick={shuffle}
            >
              <span class="hidden sm:inline">
                <Localized id="contributors.shuffle" />
              </span>
              <ShuffleIcon size={24} class="block sm:hidden" />
            </Button>
          </div>

          {/* page cards - slimevr contributors */}
          <div class="flex flex-row flex-wrap gap-4 mt-8 justify-around">
            {/* filter slimes by search term if exists */}
            {filteredContribs().map((contrib, i) => {
              const isShiny = shinyContribs().some(
                (s) => s.name === contrib.name
              );
              const cachedImage = imageCache.get(contrib.name);

              return (
                <Card
                  class={
                    isShuffling()
                      ? "animate-pulse scale-95 opacity-80 transform rotate-1 pointer-events-none"
                      : "scale-100 opacity-100 transform rotate-0"
                  }
                  {...contrib}
                  color={isShiny ? SHINY_GRADIENT : contrib.color}
                  isFocused={focusedCard() === contrib.name}
                  onClick={() => handleCardClick(contrib.name)}
                  data-card-name={contrib.name}
                  cachedImage={cachedImage}
                  isFirefox={isFirefox()}
                />
              );
            })}
            {/* if none found, show sad message */}
            {filteredContribs().length === 0 && (
              <Localized id="contributors.none" />
            )}
          </div>
        </Container>
      </Section>

      {/* sponsors section */}
      {!envMissing() && (
        <Section>
          <Container class="mt-4">
            {/* section text */}
            <div class="flex flex-row justify-between items-center mb-8">
              <Typography
                tag="h2"
                variant="main-title"
                textAlign="text-center"
                key="sponsors.title"
              />
              <Button
                variant="primary"
                href={`https://github.com/sponsors/${import.meta.env.VITE_GITHUB_ORG}`}
              >
                <Localized id="sponsors.sponsor" />
              </Button>
            </div>

            <div class="mb-6">
              <Typography tag="p">
                {
                  translator("sponsors.description", {
                    activeCount: activeCount(),
                    pastCount: pastCount(),
                  }) as string
                }
              </Typography>
            </div>

            {/* sponsor states & content */}
            {sponsors.loading && (
              <div class="text-center py-8">
                <Typography tag="p" key="sponsors.loading" />
              </div>
            )}

            {sponsors.error && (
              <div class="text-center py-8">
                <Typography tag="p" key="sponsors.error" color="text-red-400" />
              </div>
            )}

            {sponsors() && (
              <>
                {activeSponsors().length > 0 ? (
                  <>
                    <div class="flex flex-wrap justify-center gap-4 mb-8">
                      {activeSponsors().map((sponsor) => (
                        <SponsorCard sponsor={sponsor} />
                      ))}
                    </div>

                    {pastSponsors().length > 0 ? (
                      <>
                        <div class="border-t border-background-40 pt-6 pb-4">
                          <div class="mb-4 text-center text-text-secondary">
                            <Typography
                              tag="h3"
                              variant="section-title"
                              textAlign="text-center"
                            >
                              <Localized id="sponsors.past" />
                            </Typography>
                          </div>
                          <div class="flex flex-wrap justify-center gap-3">
                            {pastSponsors().map((sponsor) => (
                              <PastSponsorAvatar sponsor={sponsor} />
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div class="text-center py-8">
                        <Typography tag="p" key="sponsors.none" />
                      </div>
                    )}
                  </>
                ) : (
                  <div class="text-center py-8">
                    <Typography tag="p" key="sponsors.none" />
                  </div>
                )}
              </>
            )}
          </Container>
        </Section>
      )}
    </MainLayout>
  );
}
