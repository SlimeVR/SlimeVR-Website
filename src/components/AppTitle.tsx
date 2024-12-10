import { Component, ParentComponent } from "solid-js";
import { Title } from "@solidjs/meta";
import { Localized, useFluent } from "@llelievr.dev/solid-fluent";

export const AppTitle: Component<{ key: string }> = (props) => {
  const i10n = useFluent();
  return (
    <Title>
      {/* <Localized
        id="title"
        vars={{ title: i10n.getString(props.key)() }}
      ></Localized> */}
    </Title>
  );
};
