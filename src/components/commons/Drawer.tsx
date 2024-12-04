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
import { ArrowIcon } from "./icons/ArrowIcon";
import { TypedEventTarget } from "typescript-event-target";
import { getContentSize } from "../../utils/dom";

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
  let drawerContainerRef: HTMLDivElement;

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
  let itemRef: HTMLDivElement;
  let itemContentRef: HTMLDivElement;
  let itemIndex: number;

  if (!context) throw new Error("no context for the drawer found!");

  const [contentSize, setContentSize] = createSignal<DOMRect | null>(null);
  const [isOpen, setOpen] = createSignal(props.open);

  const onResize = () => {
    setContentSize(getContentSize(itemContentRef));
  };

  const onOpen = ({ detail: { index } }: CustomEvent) => {
    setOpen(index === itemIndex);
  };

  const toggleOpen = () => {
    if (isOpen()) {
      setOpen(false);
    } else {
      context.open(itemIndex);
    }
  };

  onMount(() => {
    itemContentRef.addEventListener("resize", onResize);
    context.events.addEventListener("open", onOpen);
    setContentSize(getContentSize(itemContentRef));
    itemIndex = context.getIndex(itemRef);
  });

  onCleanup(() => {
    itemContentRef.removeEventListener("resize", onResize);
    context.events.removeEventListener("open", onOpen);
  });

  const style = createMemo(() => {
    if (!contentSize() || !isOpen()) return { height: `0px` };

    return { height: `${contentSize().height}px` };
  });

  return (
    <>
      <div class="flex flex-col gap-3" ref={itemRef} id={props.id}>
        <div
          class="flex justify-between border-b-2 border-background-50 hover:cursor-pointer hover:bg-background-50 px-4 py-1 rounded-md"
          onClick={toggleOpen}
        >
          {props.title}
          <ArrowIcon
            direction={isOpen() ? "down" : "right"}
            size={20}
            class="fill-background-10"
          ></ArrowIcon>
        </div>
        <div
          class="overflow-clip transition-height bg-background-50 rounded-lg"
          style={style()}
        >
          <div ref={itemContentRef} class="p-2 rounded-lg">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};
