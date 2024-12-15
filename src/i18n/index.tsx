import * as i18n from "@solid-primitives/i18n";
import {
  children,
  Component,
  createContext,
  createResource,
  createSignal,
  JSX,
  ParentComponent,
  Show,
  Signal,
  Suspense,
  useContext,
} from "solid-js";

const LOCALES = [
  {
    name: "English",
    lang: "en",
  },
];

async function loadCurrentLang(currentLang: string | null) {
  "use server";
  if (!currentLang) return null;

  try {
    const text = await import(`~/assets/i18n/${currentLang}.json`);
    return i18n.flatten(text);
  } catch (e) {
    console.error(e);
    return null;
  }
}

interface I18nContext {
  currentLangSignal: Signal<string>;
  translator: (key: string, ...args: any) => string;
}
const I18nContext = createContext<I18nContext>();

const firstPossibleLanguage = () => "en";
// negotiateLanguages(
//   navigator.languages,
//   LOCALES.map(({ lang }) => lang),
//   { defaultLocale: "en", strategy: "lookup" }
// )[0];

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) throw new Error("useI18n is used outside of a <I18nProvider/>");

  return context;
};

export const Localized: Component<{ id: string }> = (props) => {
  const { translator } = useI18n();
  return <>{translator(props.id) ?? props.id} </>;
};

export const I18nProvider: ParentComponent<{ fallback?: JSX.Element }> = (
  props
) => {
  const currentLangSignal = createSignal<string>(firstPossibleLanguage());
  const [currentLang] = currentLangSignal;
  const [bundleText, { mutate }] = createResource(currentLang, loadCurrentLang);

  return (
    <Suspense>
      <Show when={bundleText()} fallback={<>LOADING</>}>
        {(dict) => {
          const translator = i18n.translator(
            () => dict(),
            i18n.resolveTemplate
          ) as (key: string, ...args: any) => string;
          return (
            <I18nContext.Provider value={{ currentLangSignal, translator }}>
              {props.children}
            </I18nContext.Provider>
          );
        }}
      </Show>
    </Suspense>
  );
};
