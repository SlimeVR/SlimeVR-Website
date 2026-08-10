import { Component, createMemo, createSignal, onMount } from "solid-js";

interface FormattedDateProps {
  date: Date;
}

const FallbackLocale = "en-US";

export const FormattedDate: Component<FormattedDateProps> = (props) => {
  const locale =
    typeof navigator !== "undefined" ? navigator.language : FallbackLocale;

  const formattedDate = createMemo(() => {
    try {
      return props.date.toLocaleDateString(locale);
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
