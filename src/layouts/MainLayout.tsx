import {
  Component,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
} from "solid-js";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

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
      <div class="linear-gradient size-[300px] rounded-full animate-explode"></div>
    </div>
  );
};

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="flex flex-col min-h-screen pattern">
      <div class="relative overflow-clip flex-grow">
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <ExplosionDot></ExplosionDot>
        <div class="flex flex-col w-full items-center relative overflow-y-clip py-4">
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
      <Footer></Footer>
    </div>
  );
};
