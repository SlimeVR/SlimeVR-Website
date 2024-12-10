import { lazy, Suspense, type Component } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { MainLayout } from "./layouts/MainLayout";
import { I18nProvider } from "./i18n";
import { MetaProvider, Title } from "@solidjs/meta";
import { LoadingLayout } from "./layouts/LoadingLayout";

const Home = lazy(() => import("./pages/home/Home"));

const App: Component = () => {
  return (
    <I18nProvider fallback={<></>}>
      <MetaProvider>
        <Suspense fallback={<LoadingLayout></LoadingLayout>}>
          <Router>
            <Route path="/" component={MainLayout}>
              <Route path="/" component={Home}></Route>
            </Route>
          </Router>
        </Suspense>
      </MetaProvider>
    </I18nProvider>
  );
};

export default App;
