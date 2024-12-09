import {
  Component,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
} from "solid-js";
import { Navbar } from "../components/Navbar";

const ANIMATION_TIME = 6000;
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
    animationId = setTimeout(() => {
      animate();
      animateLoop();
    }, Math.random() * RANDOM_TIME + MIN_TIME);
    animate();
  };

  onMount(() => {
    setTimeout(() => {
      animateLoop();
    }, Math.floor(Math.random() * 3) * 1000);
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
    <div class="absolute" style={explodeStyle()}>
      <div class="linear-gradient size-[300px] rounded-full animate-explode"></div>
    </div>
  );
};

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="relative bg-accent-background-60 overflow-clip">
      <ExplosionDot></ExplosionDot>
      <ExplosionDot></ExplosionDot>
      <ExplosionDot></ExplosionDot>
      <ExplosionDot></ExplosionDot>
      <div class="flex flex-col w-full items-center pattern relative overflow-y-clip py-4">
        <img
          class="absolute w-full top-0"
          src="/images/Webpage_Design_Parts_header_block.webp"
        ></img>
        <div class="max-w-6xl 2xl:max-w-[1400px] w-full top-5 z-20 px-4">
          <Navbar></Navbar>
        </div>
        {props.children}
      </div>
    </div>
  );
};
