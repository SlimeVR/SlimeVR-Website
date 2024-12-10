import {
  Component,
  ComponentProps,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import { Drawer, DrawerItem } from "../../components/commons/Drawer";
import { Typography } from "../../components/commons/Typogrtaphy";
import { Localized, useFluent } from "@llelievr.dev/solid-fluent";
import { SolidMarkdown } from "solid-markdown";
import remarkGfm from "remark-gfm";

const possibleImages = [
  "/images/Nighty_For_FAQ_Block first_.webp",
  "/images/Nighty_For_FAQ_Block second_.webp",
];

const QUESTIONS_COUNT = 28;

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

const MarkdownLink = (props: ComponentProps<"a">) => (
  <a target="_blank" href={props.href} class="link text-background-20">
    {props.children}
  </a>
);

export const QASection: Component = () => {
  const l10n = useFluent();
  const [currentImage, setCurrentImage] = createSignal<string>(
    possibleImages[0]
  );

  const onOpenDrawer = (index: number, size: number) => {
    setCurrentImage(
      possibleImages[index % possibleImages.length] ?? possibleImages[0]
    );
  };

  const questions = createMemo(() =>
    Array.from({ length: QUESTIONS_COUNT }).map((_, index) => ({
      question: `qa_question-${index + 1}-question`,
      answer: `qa_question-${index + 1}-answer`,
    }))
  );

  const schema = createMemo(() =>
    JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "FAQPage",
      mainEntity: questions().map(({ question, answer }) => ({
        "@type": "Question",
        name: l10n.getString(question)(),
        acceptedAnswer: { "@type": "Answer", text: l10n.getString(answer)() },
      })),
    })
  );

  return (
    <div class="flex md:gap-12 relative md:pl-12">
      <div class="sticky top-0 left-0 h-full sm:flex hidden">
        <div class="md:flex w-72 items-center justify-center pt-12 hidden">
          <img src={currentImage()} class="object-contain object-center"></img>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <script type="application/ld+json">{schema()}</script>
        <Typography
          tag="h3"
          variant="main-title"
          textAlign="text-center"
          key="home_qa-section_title"
        />
        <div class="bg-background-70 w-full p-4 rounded-lg border border-background-30">
          <Drawer onOpen={onOpenDrawer}>
            <For each={questions()}>
              {(question, index) => (
                <DrawerItem
                  title={
                    <Typography
                      tag="h4"
                      variant="section-title"
                      key={question.question}
                    ></Typography>
                  }
                  open={index() === 0}
                >
                  <SolidMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ a: MarkdownLink }}
                  >
                    {l10n.getString(question.answer)()}
                  </SolidMarkdown>
                </DrawerItem>
              )}
            </For>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
