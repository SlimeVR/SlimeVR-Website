import { Link, Meta } from "@solidjs/meta";
import remarkGfm from "remark-gfm";
import { ParentProps } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { AppTitle } from "~/components/AppTitle";
import { Container } from "~/components/commons/Container";
import { MarkdownLink } from "~/components/commons/Markdown";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";

export default function TmPage(props: ParentProps) {
  return (
    <MainLayout>
      <AppTitle key="tm.title"></AppTitle>
      <Link rel="canonical" href="https://slimevr.dev/tm" />
      <Meta name="robots" content="index, follow" />

      <Section>
        <Container class="mt-4">
          <SolidMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ a: MarkdownLink }}
            class="text-sm w-full min-w-full prose-xl prose text-background-10 prose-h1:text-background-10 prose-h2:text-background-10 prose-a:text-background-20 prose-strong:text-background-10 prose-code:text-background-20"
          >
            {`
## SlimeVR is a trademark or a registered trademark of SlimeVR B.V.

---

**Usage of SlimeVR software, hardware, or other intellectual property does not grant you the right to use SlimeVR trademark as your own.**

The purpose of a trademark is to remove uncertainty for users and customers regarding the product's manufacturer or endorsement.
You're not allowed to market your products using SlimeVR name, and your usage of the name should be only factual and descriptive.
For example, calling original SlimeVR products SlimeVR or describing compatibility of other products or derivatives.
This applies to all products, including software, and hardware including non-official Full-Body Trackers.

**Here are a few _acceptable_ uses of SlimeVR name when selling unofficial Slime trackers:**
* SlimeVR-compatible trackers
* Unofficial SlimeVR trackers / Non-official SlimeVR trackers
* DIY SlimeVR trackers
* Third-party SlimeVR Trackers
* Custom SlimeVR-compatible trackers
* < Your Brand > Slime Trackers
* Using "SlimeVR" as a search tag

**_Unacceptable_ uses include, but are not limited to:**
* SlimeVR store
* Buy SlimeVR
* SlimeVR Trackers
* Original SlimeVR
* Official SlimeVR
* SlimeVR BMI270 (or any other IMU model along with SlimeVR name)
* < Your brand > SlimeVR / < your brand > SlimeVR Trackers

Use of the SlimeVR name that can cause confusion is not allowed in any part of the listing, including, but not limited to: product title, product description, product metadata,
site title, site name, site metadata, site texts, social media posts, or other advertisement.

Also, please ensure you use the correct spelling and capitalization: only **"SlimeVR" is acceptable**.
Not "Slimevr", "slimevr", or "Slime VR". You're allowed to use the word "slime" as you wish, it's not a trademark.

Please understand that we have an obligation to reduce confusion for the customers,
and we believe that our usage terms are generous compared to many other companies and products.
This applies to all sellers or derivative products, we do not make exceptions.

---

If you have any questions about SlimeVR trademark or copyrighted materials, you can reach out to us at *tm[at]slimevr.dev*.
                `}
          </SolidMarkdown>
        </Container>
      </Section>
    </MainLayout>
  );
}
