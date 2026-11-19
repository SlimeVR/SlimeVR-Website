import { Component, createMemo, createSignal } from "solid-js";
import { FAQSection } from "../../../components/commons";

const possibleImages = [
  "/images/Nighty_For_FAQ_Block_first_.webp",
  "/images/Nighty_For_FAQ_Block_second_.webp",
];

const QUESTIONS_COUNT = 27;

export const QASection: Component = () => {
  const [currentImage, setCurrentImage] = createSignal<string>(
    possibleImages[0]
  );

  const onOpenDrawer = (index: number) => {
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

  return (
    <div class="relative flex md:gap-12 md:pl-12">
      <div class="sticky top-0 left-0 hidden h-full sm:flex">
        <div class="hidden w-72 items-center justify-center pt-12 md:flex">
          <img
            src={currentImage()}
            class="no-interact object-contain object-center"
            alt=""
          ></img>
        </div>
      </div>
      <div class="flex w-full flex-col gap-3">
        <FAQSection
          titleKey="home.qa.title"
          items={questions()}
          onOpen={onOpenDrawer}
        />
      </div>
    </div>
  );
};
