import { Link, Meta } from "@solidjs/meta";
import remarkGfm from "remark-gfm";
import { ParentProps } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { AppTitle } from "~/components/AppTitle";
import { MarkdownLink } from "~/components/commons/Markdown";
import { Typography } from "~/components/commons/Typography";
import { Section } from "~/components/Section";
import { MainLayout } from "~/layouts/MainLayout";

export default function PrivacyPage(props: ParentProps) {
  return (
    <MainLayout>
      <AppTitle key="privacy.title"></AppTitle>
      <Link rel="canonical" href="https://slimevr.dev/privacy" />
      <Meta name="robots" content="index, follow" />

      <Section>
        <div class="mt-4">
          <div class="bg-background-70 border border-background-40 rounded-2xl p-4">
            <SolidMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ a: MarkdownLink }}
              class="text-sm w-full min-w-full prose-xl prose text-background-10 prose-h1:text-background-10 prose-h2:text-background-10 prose-a:text-background-20 prose-strong:text-background-10 prose-code:text-background-20"
            >
              {`
# Privacy Policy


## Our Commitment to Privacy

Your privacy is important to us. To better protect your privacy we provide this Privacy Policy, which explains our online information practices and the choices you can make about the way your information is collected and used. To make this Privacy Policy easy to find, we make it available on our homepage and at every point where personally identifiable data may be requested.

## The Information We Collect

This Privacy Policy applies to all information collected or submitted on the website. The types of personal information collected on these pages may include:
- Name (Personal or Company)
- Address
- Email address
- Phone number

## How We Use Information

We may use your email address to communicate with you, for example, to notify you of content that you might find of interest. We use return email addresses to answer the emails we receive.

We will never sell your personal information to any other company.

Finally, we never use or share personally identifiable information provided to us online in ways unrelated to the ones described above without also providing you an opportunity to opt out or otherwise prohibit such unrelated uses.

## A Word On "Cookies"

"Cookies" are small items of data that some websites either write to your hard drive upon your visit to their site(s) or store in the browser. 
These data files contain information the site can use to organize the pages you have visited on a particular website. 
Some of our websites may use "cookie" technology to measure site activity and tailor information to fit your personal interests. 
In this way, we can deliver tailor-made information suiting your personal interests upon your next visit to our site(s). 
Our use of "cookies" technology is, thus, to provide you with a more individualized delivery of information and an optimal viewing experience.

## Google Analytics

We use Google Analytics and the information provided to analyze traffic activity and webpage usage to improve the Website. 
Google Analytics does not identify individual users or associate your IP address with any other data held by Google.
By using this website, you consent to the processing of data about you by Google in the manner described in Google's Privacy Policy for the purposes set out above. 
You can opt out of Google Analytics if you disable or refuse the cookie, disable JavaScript, or use the opt-out service provided by Google.

## Google Ads and Remarketing

We use the remarketing feature from Google Ads. 
This feature is used to present website users advertising within the Google ad network. 
A "cookie" is stored in the browser of a user to the website that enables the user to be recognized on Google's network after they leave our site. 
Google can present the user with advertisements that relate to content that they had previously viewed on websites that use the remarketing feature from Google.
According to its own policy, Google does not collect any personal data with this process. 
Nevertheless, if you do not want to use the remarketing feature from Google, you can disable it by changing the appropriate settings at Google Ad Settings.

## Social Media

slimevr.dev may engage with social media sites such as Youtube, Tiktok, Bluesky, Reddit and others. 
Please review the privacy policy of these services if you choose to interact with information from slimevr.dev through these services. Social media privacy policy information is available through the individual social media services.

## How To Contact Us

If you have any questions about this Privacy Policy, please contact us via email (support@slimevr.dev) or through our [support system](https://shop.slimevr.dev/pages/support)

Last updated: 12/13/24
                `}
            </SolidMarkdown>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
