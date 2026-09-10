import { Link, Meta } from "@solidjs/meta";
import { AppTitle, MainLayout, Section } from "~/components/layout";
import { PressKit } from "~/features/press-kit";

export default function PressKitPage() {
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
