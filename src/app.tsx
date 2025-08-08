import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense, onMount, onCleanup } from "solid-js";
import { I18nProvider } from "~/i18n";
import { OverlayScrollbars } from "overlayscrollbars";
import { setInstance } from "~/utils/scrollbar";
import "overlayscrollbars/overlayscrollbars.css";
import "./app.css";

export default function App() {
  let overlayScrollbar: OverlayScrollbars | null = null;

  onMount(() => {
    overlayScrollbar = OverlayScrollbars(document.body, {
      scrollbars: {
        visibility: "auto",
        autoHide: "move",
        autoHideDelay: 1000,
      },
    });
    setInstance(overlayScrollbar);
  });

  onCleanup(() => {
    if (overlayScrollbar) {
      overlayScrollbar.destroy();
      setInstance(null);
    }
  });

  return (
    <ErrorBoundary
      fallback={(err) => {
        console.error(err);
        return <>error</>;
      }}
    >
      <Suspense>
        <I18nProvider fallback={<>LOADING</>}>
          <Suspense>
            <MetaProvider>
              <ErrorBoundary
                fallback={(err) => {
                  console.log("????", err);
                  return <>ROUTER ERROR</>;
                }}
              >
                <Router root={(root) => <Suspense>{root.children}</Suspense>}>
                  <FileRoutes />
                </Router>
              </ErrorBoundary>
            </MetaProvider>
          </Suspense>
        </I18nProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
