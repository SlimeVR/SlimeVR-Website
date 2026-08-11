import { Component, createMemo, createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";

interface FormattedDateProps {
  date: Date;
}

const FallbackLocale = "en-US";

export const FormattedDate: Component<FormattedDateProps> = (props) => {
  const [locale, setLocale] = createSignal(FallbackLocale);

  onMount(() => {
    if (!isServer && typeof navigator != "undefined")
      setLocale(navigator.language);
  });

  const formattedDate = createMemo(() => {
    try {
      return props.date.toLocaleDateString(locale());
    } catch (e) {
      return props.date.toLocaleDateString(FallbackLocale);
    }
  });

  return (
    <time
      dateTime={props.date.toISOString()}
      class="text-xs font-medium tracking-widest text-background-30"
    >
      {formattedDate()}
    </time>
  );
};
