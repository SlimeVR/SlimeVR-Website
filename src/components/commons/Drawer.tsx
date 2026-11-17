import {
  createContext,
  createMemo,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentComponent,
  useContext,
} from "solid-js";
import { isServer } from "solid-js/web";
import { TypedEventTarget } from "typescript-event-target";
import { getContentSize } from "~/utils/dom";
import { ArrowIcon } from "./icons/ArrowIcon";

interface DrawerContextData {
  openDrawer?: number;
  events: TypedEventTarget<{ open: CustomEvent<{ index: number }> }>;
  open(index: number): void;
  getIndex(elem: HTMLElement): number;
}

const DrawerContext = createContext<DrawerContextData>();

interface DrawerProps {
  onOpen?: (index: number, size: number) => void;
}

export const Drawer: ParentComponent<DrawerProps> = (props) => {
  let drawerContainerRef!: HTMLDivElement;

  let context: DrawerContextData = {
    events: new TypedEventTarget(),
    open: (index) => {
      context.openDrawer = index;
      context.events.dispatchTypedEvent(
        "open",
        new CustomEvent("open", { detail: { index } })
      );
      props.onOpen?.(index, Array.from(drawerContainerRef.children).length);
    },
    getIndex: (elem) => {
      return Array.from(drawerContainerRef.children).indexOf(elem);
    },
  };

  return (
    <DrawerContext.Provider value={context}>
      <div class="flex flex-col gap-5" ref={drawerContainerRef}>
        {props.children}
      </div>
    </DrawerContext.Provider>
  );
};

interface DrawerItemProps {
  title: JSX.Element;
  open?: boolean;
  id?: string;
}

export const DrawerItem: ParentComponent<DrawerItemProps> = (props) => {
  const context = useContext(DrawerContext);
  let itemRef!: HTMLDivElement;
  let itemContentRef!: HTMLDivElement;
  let itemIndex: number;
  let contentSizeObserver!: ResizeObserver;

  if (!context) throw new Error("no context for the drawer found!");

  const [contentSize, setContentSize] = createSignal<DOMRect>();
  const [isOpen, setOpen] = createSignal(props.open);
  let resizeRafId = 0;

  const onResize = () => {
    setContentSize(getContentSize(itemContentRef));
  };

  const onOpen = ({ detail: { index } }: CustomEvent) => {
    setOpen(index === itemIndex);
  };

  const toggleOpen = () => {
    if (!isOpen()) {
      context.open(itemIndex);
    }
  };

  if (!isServer) {
    onMount(() => {
      contentSizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(resizeRafId);
        resizeRafId = requestAnimationFrame(onResize);
      });
      contentSizeObserver.observe(itemContentRef);
      context.events.addEventListener("open", onOpen);
      setContentSize(getContentSize(itemContentRef));
      itemIndex = context.getIndex(itemRef);
    });

    onCleanup(() => {
      cancelAnimationFrame(resizeRafId);
      if (contentSizeObserver) contentSizeObserver.unobserve(itemContentRef);
      context.events.removeEventListener("open", onOpen);
    });
  }

  const style = createMemo(() => {
    if (isServer) return { height: "inherit" };
    if (!contentSize() || !isOpen()) return { height: `0px` };

    return { height: `${contentSize()?.height}px` };
  });

  return (
    <>
      <div class="flex flex-col gap-3" ref={itemRef} id={props.id}>
        <div
          class={"group hover:bg-background-50 rounded-lg hover:cursor-pointer"}
          onClick={toggleOpen}
        >
          <div class="border-background-50 flex w-full justify-between border-b-2 px-4 py-2 group-hover:border-transparent">
            {props.title}
            <ArrowIcon
              direction={isOpen() ? "down" : "right"}
              size={20}
              class="fill-background-10"
            ></ArrowIcon>
          </div>
        </div>
        <div
          class="bg-background-50 overflow-clip rounded-lg transition-[height]"
          style={style()}
        >
          <div ref={itemContentRef} class="rounded-lg p-4">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};
