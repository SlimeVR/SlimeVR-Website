import { Meta } from "@solidjs/meta";
import { ArrowButton } from "~/components/commons/ArrowButton";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";

const contributors = [
  "Sctanf",
  "AnnaDevMiner",
  "Aoki",
  "Butterscotch",
  "Cake",
  "Cyan",
  "Bagel",
  "dqmagduwu",
  "Eiren",
  "Erimel",
  "Flar",
  "Global",
  "Loucass",
  "Meia",
  "NightyEve",
  "poly2",
  "polymoria",
  "Rosdale",
  "Sigtyr",
  "slime2",
  "slime3",
  "slime4",
  "Smeltie",
  "Snaila",
  "Spazzwan",
  "Summer",
  "unlogisch",
  "Uriel",
  "Vyolex",
  "ZRock",
];

export default function TeamSection() {
  return (
    <MainLayout>
      <Section>
        <Meta name="robots" content="noindex, nofollow" />
        <div class="mt-4">
          <div class="bg-background-70 border border-background-40 rounded-2xl p-4">
            <Typography tag="h1" variant="main-title">
              <div class="text-center pb-10">SlimeVR Contributors</div>
            </Typography>
            <div class="grid grid-cols-6 gap-2">
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Polymoria</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/firstslime.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Polymoria</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/slime2.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Polymoria</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/slime3.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Polymoria</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/slime4.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">DQ</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/DQ.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Polymoria</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/corgy.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Snaila</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/snaila.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Cake</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/cake.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">ZRock</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/zrock.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Flar</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Flar.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Erimel</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Erimel.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Polymoria</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/polymoria.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Vyolex</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Vyolex.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Smeltie</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Smeltie.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Spazznyan</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Spazznyan.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Butterscotch</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Butterscotch.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Summer</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Summer.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Loucas</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Loucass.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Slime7</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Slime7.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">NightyEve</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/NightyEve.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Uriel</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Uriel.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Rosdale</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Rosdale.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Eiren</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Eiren.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Cyan</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Cyan.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">AnnaDevMiner</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/AnnaDevMiner.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Global</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Global.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Global</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Global.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Slime8</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Slime8.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">Slime9</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/Slime9.png" />
                </div>
              </div>
              <div class="bg-background-70 border border-background-40 rounded-2xl p-4 gap-4 flex flex-col sm:flex-row md:flex-col">
                <div class="text-center">poly2</div>
                <div class="w-30 h-30">
                  <img src="/images/slimeList/poly2.png" />
                </div>
              </div>
            </div>
            <ArrowButton href="/">Go back to the home page</ArrowButton>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
