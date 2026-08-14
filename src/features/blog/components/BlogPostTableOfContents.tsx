import {
  Component,
  createSignal,
  onCleanup,
  Show,
  For,
  onMount,
} from "solid-js";
import { BlogHeading } from "../utils/blog-table-of-contents.helper";
import clsx from "clsx";

interface BlogPostTableOfContentsProps {
  headings: BlogHeading[];
}

export const BlogPostTableOfContents: Component<
  BlogPostTableOfContentsProps
> = (props) => {
  const [activeId, setActiveId] = createSignal<string>("");
  let observer: IntersectionObserver | undefined;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 1 }
    );

    props.headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer?.observe(element);
    });
  });

  onCleanup(() => observer?.disconnect());

  return (
    <aside class="hidden lg:block">
      <div class="sticky top-24 flex flex-col gap-8">
        <Show when={props.headings.length > 0}>
          <nav
            aria-label="On this page"
            class="flex flex-col gap-4 rounded-2xl border border-background-40 bg-background-70 p-4"
          >
            <span class="text-xs font-medium uppercase tracking-widest text-background-30">
              On this page
            </span>
            <ul class="flex flex-col gap-2">
              <For each={props.headings}>
                {(heading) => {
                  const isActive = () => activeId() === heading.id;

                  return (
                    <li>
                      <a
                        href={`#${heading.id}`}
                        class={clsx(
                          "block text-sm leading snug transition-colors",
                          heading.level === 3 && "pl-4",
                          isActive()
                            ? "font-semibold text-accent-background-10"
                            : "text-background-10/80 hover:text-accent-background-10"
                        )}
                      >
                        {heading.text}
                      </a>
                    </li>
                  );
                }}
              </For>
            </ul>
          </nav>
        </Show>
      </div>
    </aside>
  );
};
