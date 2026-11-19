import {
  Component,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
} from "solid-js";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import clsx from "clsx";

const ANIMATION_TIME = 5500;
const MIN_TIME = 6000;
const RANDOM_TIME = 5000;
const ExplosionDot: Component = () => {
  let animationId: NodeJS.Timeout;
  let animationResetId: NodeJS.Timeout;

  const [explodePos, setExplodePos] = createSignal<{
    x: number;
    y: number;
  } | null>();

  const animate = () => {
    setExplodePos({
      x: Math.random() * window.screen.width,
      y: Math.random() * window.screen.height + window.scrollY,
    });
    animationResetId = setTimeout(() => {
      setExplodePos(null);
    }, ANIMATION_TIME);
  };

  const animateLoop = () => {
    animationId = setTimeout(
      () => {
        animate();
        animateLoop();
      },
      Math.random() * RANDOM_TIME + MIN_TIME
    );
  };

  onMount(() => {
    animateLoop();
  });

  onCleanup(() => {
    clearTimeout(animationId);
    clearTimeout(animationResetId);
  });

  const explodeStyle = createMemo(() => {
    const pos = explodePos();
    if (!pos) return { display: "none" };
    return {
      top: `${pos.y}px`,
      left: `${pos.x}px`,
      opacity: "50%",
    };
  });

  return (
    <div class="absolute -z-10" style={explodeStyle()}>
      <div class="linear-gradient animate-explode size-75 rounded-full"></div>
    </div>
  );
};

interface MainLaoutProps {
  variant?: "default" | "butterfly" | "og-slime";
}

export const MainLayout: ParentComponent<MainLaoutProps> = (props) => {
  return (
    <main class={clsx("pattern flex min-h-screen flex-col", props.variant)}>
      <div class="relative grow overflow-clip">
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <div class="relative flex w-full flex-col items-center overflow-y-clip py-4">
          <img
            class="no-interact absolute top-0 w-full"
            src="/images/Webpage_Design_Parts_header_block.webp"
            alt=""
          ></img>
          <div class="top-5 z-20 w-full max-w-6xl px-4 2xl:max-w-350">
            <Navbar></Navbar>
          </div>
          {props.children}
        </div>
      </div>
      <Footer></Footer>
    </main>
  );
};
