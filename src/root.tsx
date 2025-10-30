import "./root.css";
import { JazzInspector } from "jazz-tools/inspector";
import { JazzReactProvider } from "jazz-tools/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { apiKey } from "./common.ts";
import { Account } from "./schema.ts";
import { Home } from "./Home.tsx";
import { Settings } from "./Settings.tsx";
import { NewPostPage } from "./new-post/NewPostPage.tsx";
import { Authenticated } from "./Authenticated.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JazzReactProvider
      sync={{
        peer: `wss://cloud.jazz.tools/?key=${apiKey}`,
      }}
      AccountSchema={Account}
    >
      <BrowserRouter>
        <Routes>
          <Route index Component={Home} />
          <Route
            path="/settings"
            Component={() => (
              <Authenticated>
                <Settings />
              </Authenticated>
            )}
          />
          <Route
            path="/new"
            Component={() => (
              <Authenticated>
                <NewPostPage />
              </Authenticated>
            )}
          />
        </Routes>
      </BrowserRouter>
      <JazzInspector />
    </JazzReactProvider>
  </StrictMode>
);
