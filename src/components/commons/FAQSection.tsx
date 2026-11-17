import remarkGfm from "remark-gfm";
import { Component, createMemo, For } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import { useI18n } from "~/i18n";
import { Drawer, DrawerItem } from "./Drawer";
import { MarkdownLink } from "./Markdown";
import { Typography } from "./Typography";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchema {
  "@context": "https://schema.org/";
  "@type": "FAQPage";
  mainEntity: MainEntity[];
}

export interface MainEntity {
  "@type": "Question";
  name: string;
  acceptedAnswer: AcceptedAnswer;
}

export interface AcceptedAnswer {
  "@type": "Answer";
  text: string;
}

interface FAQSectionProps {
  titleKey: string;
  items: FAQItem[];
  id?: string;
  descriptionKey?: string;
  onOpen?: (index: number, size: number) => void;
}

export const FAQSection: Component<FAQSectionProps> = (props) => {
  const { translator } = useI18n();

  const schema = createMemo(() =>
    JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "FAQPage",
      mainEntity: props.items.map(({ question, answer }) => ({
        "@type": "Question",
        name: translator(question),
        acceptedAnswer: { "@type": "Answer", text: translator(answer) },
      })),
    })
  );

  return (
    <div class="flex w-full flex-col gap-3" id={props.id}>
      <script type="application/ld+json">{schema()}</script>
      <Typography
        tag="h2"
        variant="main-title"
        textAlign="text-center"
        key={props.titleKey}
      />
      {props.descriptionKey && (
        <Typography
          tag="p"
          textAlign="text-center"
          key={props.descriptionKey}
          whitespace="whitespace-pre-line"
        />
      )}
      <div class="bg-background-70 border-background-40 w-full rounded-lg border p-4">
        <Drawer onOpen={props.onOpen}>
          <For each={props.items}>
            {(item, index) => (
              <DrawerItem
                title={
                  <Typography
                    tag="h4"
                    variant="section-title"
                    key={item.question}
                  />
                }
                open={index() === 0}
              >
                <div class="prose-md prose text-background-10 prose-h1:text-background-10 prose-h2:text-background-10 prose-a:text-background-20 prose-strong:text-background-10 prose-code:text-background-20 w-full min-w-full">
                  <SolidMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ a: MarkdownLink }}
                  >
                    {translator(item.answer) as string}
                  </SolidMarkdown>
                </div>
              </DrawerItem>
            )}
          </For>
        </Drawer>
      </div>
    </div>
  );
};
