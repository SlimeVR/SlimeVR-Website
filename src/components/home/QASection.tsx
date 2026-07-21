import { Component, createMemo, createSignal } from "solid-js";
import { FAQSection } from "../commons/FAQSection";

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
    <div class="flex md:gap-12 relative md:pl-12">
      <div class="sticky top-0 left-0 h-full sm:flex hidden">
        <div class="md:flex w-72 items-center justify-center pt-12 hidden">
          <img
            src={currentImage()}
            class="object-contain object-center no-interact"
            alt=""
          ></img>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <FAQSection
          titleKey="home.qa.title"
          items={questions()}
          onOpen={onOpenDrawer}
        />
      </div>
    </div>
  );
};
