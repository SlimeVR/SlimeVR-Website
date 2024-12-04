import { lazy, type Component } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { MainLayout } from "./layouts/MainLayout";
import { I18nProvider } from "./i18n";
import { MetaProvider, Title } from "@solidjs/meta";
import { AppTitle } from "./components/AppTitle";

const Home = lazy(() => import("./pages/home/Home"));

const App: Component = () => {
  return (
    <MetaProvider>
      <I18nProvider fallback={<></>}>
        <Router>
          <Route path="/" component={MainLayout}>
            <Route path="/" component={Home}></Route>
          </Route>
        </Router>
      </I18nProvider>
    </MetaProvider>
  );
};

export default App;
