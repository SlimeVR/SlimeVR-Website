import clsx from "clsx";
import {
  ComponentProps,
  createMemo,
  mergeProps,
  ParentComponent,
} from "solid-js";
import { SearchIcon } from "../commons/icons/SearchIcon";

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
      "w-full bg-transparent outline-none border-none text-background-10 placeholder-background-40 text-lg",
      props.class
    );
  });

  return (
    <div
      class={clsx(
        "flex items-center rounded-full bg-background-70 border border-background-40 px-6 py-2 gap-3"
      )}
      style={{ position: "relative" }}
    >
      {/* hide text on mobile */}
      <span class={"text-background-10 text-lg hidden sm:inline"}>
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
          class="absolute left-0 right-0 bottom-0 h-[1px] bg-background-10"
          style={{ width: "100%" }}
        />
      </span>
    </div>
  );
};
