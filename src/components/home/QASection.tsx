import {
  Component,
  ComponentProps,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import { Drawer, DrawerItem } from "../../components/commons/Drawer";
import { Typography } from "../../components/commons/Typogrtaphy";
import { SolidMarkdown } from "solid-markdown";
import remarkGfm from "remark-gfm";
import { useI18n } from "~/i18n";
import { MarkdownLink } from "../commons/Markdown";

const possibleImages = [
  "/images/Nighty_For_FAQ_Block_first_.webp",
  "/images/Nighty_For_FAQ_Block_second_.webp",
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

export const QASection: Component = () => {
  const { translator } = useI18n()
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
      question: `home.qa.question-${index + 1}.question`,
      answer: `home.qa.question-${index + 1}.answer`,
    }))
  );

  const schema = createMemo(() =>
    JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "FAQPage",
      mainEntity: questions().map(({ question, answer }) => ({
        "@type": "Question",
        name: translator(question),
        acceptedAnswer: { "@type": "Answer", text: translator(answer) },
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
          tag="h2"
          variant="main-title"
          textAlign="text-center"
          key="home.qa.title"
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
                  <div class="text-inherit w-full min-w-full prose-md prose text-background-10 prose-h1:text-background-10 prose-h2:text-background-10 prose-a:text-background-20 prose-strong:text-background-10 prose-code:text-background-20">
                    <SolidMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{ a: MarkdownLink }}
                    >
                      {translator(question.answer) as string}
                    </SolidMarkdown>
                  </div>
                </DrawerItem>
              )}
            </For>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
