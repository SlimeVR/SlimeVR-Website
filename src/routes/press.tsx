import { Link, Meta } from "@solidjs/meta";
import { AppTitle, MainLayout, Section } from "~/components/layout";

export default function PressKit() {
  return (
    <MainLayout>
      <AppTitle key="press.title" />
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://slimevr.dev/press" />
      <Section>
        <PressKit />
      </Section>
    </MainLayout>
  );
}
