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
