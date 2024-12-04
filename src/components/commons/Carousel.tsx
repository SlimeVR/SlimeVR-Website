import {
  Accessor,
  batch,
  createContext,
  createMemo,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentComponent,
  useContext,
} from "solid-js";
import { ArrowIcon } from "./icons/ArrowIcon";
import { getContentSize } from "../../utils/dom";

interface CarouselContextData {
  current: Accessor<number>;
  getIndex(elem: HTMLElement): number;
  currentStepContentSize(rect: DOMRect): void;
}

const CarouselContext = createContext<CarouselContextData>();

interface CarouselProps {}

// WIP
// Stopped working on it until i get it working
export const Carousel: ParentComponent<CarouselProps> = (props) => {
  let carouselRef: HTMLDivElement;

  const [current, setCurrent] = createSignal(0);

  const [stepContentSize, setStepContentSize] = createSignal<DOMRect | null>(
    null
  );

  let context: CarouselContextData = {
    current: current,
    getIndex: (elem) => {
      return Array.from(carouselRef.children).indexOf(elem);
    },
    currentStepContentSize: (rect) => {
      setStepContentSize(rect);
    },
  };

  onMount(() => {
    setCurrent(carouselRef.children.length > 1 ? 1 : 0);
    setInterval(() => {
      setCurrent((curr) => (curr + 1) % carouselRef.children.length);
    }, 1000);
  });

  const arrowStyle = createMemo(() => {
    if (!stepContentSize()) return;

    return {
      top: `${stepContentSize().height / 2 - 32}px`,
    };
  });

  return (
    <CarouselContext.Provider value={context}>
      <div class="relative overflow-x-clip">
        <div class="w-full relative aspect-video" ref={carouselRef}>
          {props.children}
        </div>
        <div
          class="absolute left-0 h-16 w-16 flex justify-center items-center"
          style={arrowStyle()}
        >
          <ArrowIcon direction="left" size={20} color="white"></ArrowIcon>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

interface CarouselStepProps {
  description: JSX.Element;
}

export const CarouselStep: ParentComponent<CarouselStepProps> = (props) => {
  const context = useContext(CarouselContext);
  let itemIndex: number;
  let itemRef: HTMLDivElement;
  let stepContentRef: HTMLDivElement;
  let contentsRef: HTMLDivElement;
  let containerResizeObserver = new ResizeObserver(() => onResize());

  if (!context) throw new Error("no context for the carousel found!");

  const [stepContentSize, setStepContentSize] = createSignal<DOMRect | null>(
    null
  );

  const onResize = () => {
    setStepContentSize(getContentSize(itemRef));
  };

  onMount(() => {
    containerResizeObserver.observe(itemRef);
    itemIndex = context.getIndex(itemRef);
    onResize();
  });

  onCleanup(() => {
    containerResizeObserver.unobserve(itemRef);
  });

  const currentIndex = () =>
    Math.max(-1, Math.min(1, itemIndex - context.current()));

  const style = createMemo(() => {
    if (!stepContentSize()) return;

    const index = Math.max(-1, Math.min(1, itemIndex - context.current()));

    return {
      left: `${
        (index !== 0
          ? stepContentSize().width * 0.15
          : stepContentSize().width) * index
      }px`,
      // transform: `scale(${index !== 0 ? 70 : 80}%)`,
      "z-index": index !== 0 ? 0 : 1,
      // padding: index === 0 ? `0px 60px` : "",
    };
  });

  const scaleStyle = createMemo(() => {
    if (!stepContentSize()) return;

    const index = Math.max(-1, Math.min(1, itemIndex - context.current()));

    return {
      transform: `scale(${index !== 0 ? 70 : 80}%)`,
    };
  });

  return (
    <div ref={itemRef} class="relative">
      <div
        class="absolute top-0 w-full transition-carousel"
        ref={stepContentRef}
        style={style()}
      >
        <div
          class="transition-carousel"
          ref={contentsRef}
          style={scaleStyle()}
          onTransitionEnd={() => {
            if (currentIndex() === 0)
              context.currentStepContentSize({
                ...getContentSize(contentsRef.children[0]),
                height: getContentSize(contentsRef.children[0]).height * 1.2,
              });
          }}
        >
          {props.children}
        </div>
        {props.description}
      </div>
    </div>
  );
};
