import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import { FluentProvider } from "@llelievr.dev/solid-fluent";
import {
  createContext,
  createRenderEffect,
  createResource,
  createSignal,
  JSX,
  ParentComponent,
  Show,
  Signal,
} from "solid-js";
import { createStoredSignal } from "../utils/store";

const LOCALES = [
  {
    name: "English",
    lang: "en",
  },
];

async function loadCurrentLang(currentLang: string | null) {
  console.log(currentLang);
  if (!currentLang) return null;

  try {
    const bundle = new FluentBundle(currentLang);
    const fetchRessource = await fetch(`/i18n/${currentLang}.ftl`);
    const ressource = new FluentResource(await fetchRessource.text());
    const errors = bundle.addResource(ressource);
    for (const error of errors) throw error;
    return bundle;
  } catch (e) {
    console.error(e);
    return null;
  }
}

interface I18nContext {
  currentLangSignal: Signal<string>;
}
const I18nContext = createContext<I18nContext>();

const firstPossibleLanguage = () =>
  negotiateLanguages(
    navigator.languages,
    LOCALES.map(({ lang }) => lang),
    { defaultLocale: "en", strategy: "lookup" }
  )[0];

export const I18nProvider: ParentComponent<{ fallback?: JSX.Element }> = (
  props
) => {
  const currentLangSignal = createStoredSignal<string>(
    firstPossibleLanguage(),
    "@slimevr.dev/current-lang",
    {
      onBeforeSave: (value) =>
        LOCALES.find(({ lang }) => lang === value)?.lang ??
        firstPossibleLanguage(),
    }
  );
  const [currentLang] = currentLangSignal;
  const [bundle, { mutate }] = createResource(currentLang, loadCurrentLang);

  createRenderEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on(
        "locales-update",
        async ({ bundle }: { bundle: string }) => {
          if (bundle === currentLang()) {
            const newBundle = await loadCurrentLang(bundle);
            mutate(() => newBundle);
          }
        }
      );
    }
  });

  return (
    <I18nContext.Provider value={{ currentLangSignal }}>
      <Show when={bundle()} fallback={props.fallback}>
        {(bundle) => (
          <FluentProvider bundle={bundle()}>{props.children}</FluentProvider>
        )}
      </Show>
    </I18nContext.Provider>
  );
};
