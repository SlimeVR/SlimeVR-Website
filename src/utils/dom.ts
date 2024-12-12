import { createMediaQuery } from "@solid-primitives/media";
import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { Accessor } from "solid-js";
import { isServer } from "solid-js/web";

export const getContentSize = (elem: Element) => elem.getBoundingClientRect();

const fullConfig = resolveConfig(tailwindConfig);
type BreakpointKey = "mobile" | "sm" | "nmd" | "md" | "lg" | "xl" | "2xl";

export function createBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const capitalizedKey =
    breakpointKey.toString()[0].toUpperCase() +
    breakpointKey.toString().substring(1);
  type Key = `is${Capitalize<K>}`;

  const bool = isServer
    ? false
    : createMediaQuery(
        fullConfig.theme.screens[breakpointKey].raw
          ? fullConfig.theme.screens[breakpointKey].raw
          : `(min-width: ${fullConfig.theme.screens[breakpointKey]})`
      );

  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, Accessor<boolean>>;
}
