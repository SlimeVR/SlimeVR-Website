import { Navigator } from "@solidjs/router";

export const getContentSize = (elem: Element) => elem.getBoundingClientRect();

export const scrollToSection = (
  sectionId: string,
  pathname: string,
  navigate: Navigator
) => {
  if (pathname === "/") {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // use location.state to pass scrollTo
  navigate("/", { state: { scrollTo: sectionId } });
};

export const getCardIndex = (index: number) => {
  const periodDays = 3; // change image every 3 days
  const period = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * periodDays));
  const i = (period % index) + 1;
  return i;
};

export const getCardName = (display: { name: string }[]) => {
  const i = getCardIndex(display.length) - 1;
  return i >= 0 ? display[i].name : display[0].name;
};
