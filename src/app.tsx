import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { I18nProvider } from "~/i18n";
import "./app.css";

export default function App() {
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
