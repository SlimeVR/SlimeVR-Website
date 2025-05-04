import { Component, createSignal, onCleanup, onMount } from "solid-js";

interface ContributorCardProps {
  img?: string;
  name?: string;
}

export const ContributorCard: Component<ContributorCardProps> = (props) => {

  let card: HTMLDivElement;
  let glow: HTMLDivElement;
  const [focus, setFocus] = createSignal(false);

  const cardTilt = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = -((y - centerY) / centerY);

    card.style.transform = `perspective(1000px) rotateY(${percentX * 15}deg) rotateX(${percentY * 15}deg)`;
    glow.style.opacity = '1';
    glow.style.backgroundImage = `
                radial-gradient(
                    circle at 
                    ${x}px ${y}px, 
                    #ffffff66,
                    #0000000f
                )
            `;
  };

  const cardReset = () => {
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    glow.style.opacity = '0';
  };

  const cardFocus = () => {
    if (focus())
      return;
    card.style.scale = '1.2';
    card.style.zIndex = '1';
    const pos = card.getBoundingClientRect();
    card.style.top = (window.innerHeight / 2) - (card.clientHeight / 2) - pos.top + 'px';
    card.style.left = (window.innerWidth / 2)  - (card.clientWidth / 2) - pos.left + 'px';
    card.style.boxShadow = '0px 10px 20px 8px #02111db8';
    card.onmousemove = cardTilt;
    setFocus(true);
  };

  const isOnCard = (x: number, y: number) => {
    const pos = card.getBoundingClientRect();
    return x >= pos.left && x <= pos.right && y >= pos.top && y <= pos.bottom;
  };

  const handleClick = (e: MouseEvent) => {
    if (focus() && !isOnCard(e.x, e.y)) {
      card.style.scale = "1";
      card.style.position = "relative";
      card.style.top = "0px";
      card.style.left = "0px";
      card.style.zIndex = "0";
      card.style.boxShadow = 'none';
      card.onmousemove = null;
      setFocus(false);
    }
  };

  onMount(() => {
    if (typeof window === 'undefined') {
      return null
    }
    document.addEventListener('mouseup', handleClick);
  });

  onCleanup(() => {
    if (typeof window === 'undefined') {
      return null
    }
    document.removeEventListener('mouseup', handleClick);
  });

  return (
    <div>
      <div
        ref={card}
        onMouseLeave={cardReset}
        onClick={focus() ? null : cardFocus}
        class="w-70 h-96 bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-100">
        <div
          ref={glow}
          class="absolute w-full h-full rounded-2xl">
        </div>
        <div class="p-6 flex flex-col h-full justify-between relative z-10">
          <div>
            <h2 class="text-3xl font-bold text-white mb-2">{ props.name }</h2>
            <p class="text-gray-200"></p>
          </div>
          <div class="space-y-4">
            <div class="bg-white bg-opacity-20 rounded-lg p-3">
              <div class="text-xs text-gray-300 uppercase"></div>
              <div class="text-2xl font-bold text-white"></div>
            </div>
            <button
              class="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold transform transition hover:scale-100 active:scale-100">
              Test
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};
