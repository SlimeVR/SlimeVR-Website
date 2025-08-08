import { OverlayScrollbars } from "overlayscrollbars";

let overlayScrollbar: OverlayScrollbars | null = null;

export function setInstance(instance: OverlayScrollbars | null) {
  overlayScrollbar = instance;
}

export function getInstance(): OverlayScrollbars | null {
  return overlayScrollbar;
}

export function setScroll(enabled: boolean) {
  if (!overlayScrollbar) return;
  if (enabled) overlayScrollbar.options({ overflow: { x: "hidden", y: "scroll" } });
  else overlayScrollbar.options({ overflow: { x: "hidden", y: "hidden" } });
}
