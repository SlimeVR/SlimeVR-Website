import {
  Component,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
} from "solid-js";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import clsx from "clsx";

const ANIMATION_TIME = 5500;
const MIN_TIME = 6000;
const RANDOM_TIME = 5000;
const ExplosionDot: Component = () => {
  let animationId;
  let animationResetId;

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
      <div class="linear-gradient size-75 rounded-full animate-explode"></div>
    </div>
  );
};

interface MainLaoutProps {
  variant?: 'default' | 'butterfly' | 'og-slime';
}

export const MainLayout: ParentComponent<MainLaoutProps> = (props) => {
  return (
    <div class={clsx("flex flex-col min-h-screen pattern", props.variant)}>
      <div class="relative overflow-clip grow">
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <div class="flex flex-col w-full items-center relative overflow-y-clip py-4">
          <img
            class="absolute w-full top-0"
            src="/images/Webpage_Design_Parts_header_block.webp"
          ></img>
          <div class="max-w-6xl 2xl:max-w-350 w-full top-5 z-20 px-4">
            <Navbar></Navbar>
          </div>
          {props.children}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
