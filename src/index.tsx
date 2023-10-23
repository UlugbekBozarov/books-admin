import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Spinner } from "components/common";

import "./i18n";

import "./index.css";
import App from "./App";
import { AppProvider } from "context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner width="100vw" height="100vh" />}>
      <AppProvider>
        <App />
      </AppProvider>
    </Suspense>
  </React.StrictMode>
);
