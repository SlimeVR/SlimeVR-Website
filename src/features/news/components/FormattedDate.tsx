import { Component, createMemo, createSignal, onMount } from "solid-js";

const FALLBACK_LOCALE = "en-US";

interface FormattedDateProps {
  date: string;
}

export const FormattedDate: Component<FormattedDateProps> = (props) => {
  const [locale, setLocale] = createSignal(FALLBACK_LOCALE);

  onMount(() => {
    try {
      setLocale(navigator.language);
    } catch (e) {
      setLocale(FALLBACK_LOCALE);
    }
  });

  const formattedDate = createMemo(() => {
    try {
      return new Date(props.date).toLocaleDateString(locale());
    } catch (e) {
      return props.date;
    }
  });

  return <time dateTime={props.date} class="text-xs font-medium tracking-widest text-background-30">
    {formattedDate()}
  </time>;
};
