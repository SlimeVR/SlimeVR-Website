import { Link, Meta } from "@solidjs/meta";
import { ParentProps } from "solid-js";
import { AppTitle } from "~/components/AppTitle";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";
import { ContributorCard } from "~/components/contributors/ContributorCard";

const cards = [
  {
    name: "Contributor 1",
    img: "",
  },
  {
    name: "Contributor 2",
    img: "",
  },
  {
    name: "Contributor 3",
    img: "",
  },
  {
    name: "Contributor 4",
    img: "",
  },
  {
    name: "Contributor 5",
    img: "",
  },
  {
    name: "Contributor 6",
    img: "",
  },
  {
    name: "Contributor 7",
    img: "",
  },
  {
    name: "Contributor 8",
    img: "",
  },
];

export default function ContributorPage(props: ParentProps) {
  return (
    <MainLayout>
      <AppTitle key="contributors.title"></AppTitle>
      <Link rel="canonical" href="https://slimevr.dev/contributors" />
      <Meta name="robots" content="index, follow" />

      <Section>
        <div class="mt-4">
          <div class="bg-background-70 border border-background-40 rounded-2xl p-4">
            <div class="container mx-auto">
              <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                {cards.map((product, index) => (
                  <ContributorCard
                    name={product.name}
                    img={product.img}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
