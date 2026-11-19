import clsx from "clsx";
import {
  ComponentProps,
  createMemo,
  mergeProps,
  ParentComponent,
} from "solid-js";
import { SearchIcon } from "../../../components/commons/icons/SearchIcon";

interface SearchProps extends ComponentProps<"input"> {
  onChange?: (e: Event) => void;
  loading?: boolean;
}

export const SearchBox: ParentComponent<SearchProps> = (initialProps) => {
  const props = mergeProps(
    {
      type: "input",
      loading: false,
    } satisfies Partial<SearchProps>,
    initialProps
  );

  const classes = createMemo(() => {
    return clsx(
      "w-full bg-transparent outline-hidden border-none text-background-10 placeholder-background-40 text-lg",
      props.class
    );
  });

  return (
    <div
      class={clsx(
        "bg-background-70 border-background-40 flex items-center gap-3 rounded-full border px-6 py-2"
      )}
      style={{ position: "relative" }}
    >
      {/* hide text on mobile */}
      <span class={"text-background-10 hidden text-lg sm:inline"}>
        {props.children}
      </span>
      <SearchIcon size={20} />
      <span class="relative flex-1">
        <input
          {...props}
          class={classes()}
          placeholder=""
          disabled={props.disabled}
          onInput={(e) => props.onChange && props.onChange(e)}
        />
        <span
          class="bg-background-10 absolute right-0 bottom-0 left-0 h-px"
          style={{ width: "100%" }}
        />
      </span>
    </div>
  );
};
