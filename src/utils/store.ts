import { createRenderEffect, createSignal, on } from "solid-js";

export const createStoredSignal = <T>(
  defaultValue: T,
  storeKey: string,
  options?: { onBeforeSave?: (value: T) => T; onBeforeLoad?: (value: T) => T }
) => {
  const getLocalValue = () => {
    const savedJson = localStorage.getItem(storeKey);
    if (savedJson) {
      const savedFilters = JSON.parse(savedJson) as T;
      if (typeof savedFilters === "object") {
        return { ...defaultValue, ...savedFilters };
      }
      return savedFilters ?? defaultValue;
    }
    return defaultValue;
  };

  const signal = createSignal<T>(
    (options.onBeforeSave ?? ((v) => v))(getLocalValue())
  );

  createRenderEffect(
    on(signal[0], (v) => {
      const savableValues = v;
      if (savableValues) {
        if (typeof savableValues === "object") {
          Object.keys(savableValues as any).forEach((key) => {
            const k = key as keyof T;
            if (typeof savableValues[k] === "undefined") {
              delete savableValues[k];
            }
          });
        }

        localStorage.setItem(
          storeKey,
          JSON.stringify((options.onBeforeSave ?? ((v) => v))(savableValues))
        );
      }
    })
  );

  return signal;
};
