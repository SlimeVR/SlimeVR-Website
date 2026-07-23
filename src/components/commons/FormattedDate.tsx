import { createMemo, createSignal, onMount } from "solid-js";

interface FormattedDateProps {
  date: string;
}

function normalizeDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T00:00:00`;
  }
  return dateStr;
}

const FALLBACK_LOCALE = "en-US";

export const FormattedDate = (props: FormattedDateProps) => {
  const [locale, setLocale] = createSignal(FALLBACK_LOCALE);

  onMount(() => {
    try {
      setLocale(navigator.language);
    } catch {
      // navigator may be unavailable in some SSR environments
    }
  });

  const formatted = createMemo(() => {
    try {
      return new Date(normalizeDate(props.date)).toLocaleDateString(locale(), {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return props.date;
    }
  });

  return <time datetime={props.date}>{formatted()}</time>;
};
