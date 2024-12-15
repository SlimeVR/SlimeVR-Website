import { Component } from "solid-js";
import { Title } from "@solidjs/meta";
import { useI18n } from "~/i18n";

export const AppTitle: Component<{ key: string }> = (props) => {
  const { translator } = useI18n();
  return (
    <Title>
      {translator("title", { title: translator(props.key) }) as string}
    </Title>
  );
};
