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
            class="border-background-40 bg-background-70 flex flex-col gap-4 rounded-2xl border p-4"
          >
            <span class="text-background-30 text-xs font-medium tracking-widest uppercase">
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
                          "leading snug block text-sm transition-colors",
                          heading.level === 3 && "pl-4",
                          isActive()
                            ? "text-accent-background-10 font-semibold"
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
