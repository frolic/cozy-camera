import "./root.css";
import { JazzInspector } from "jazz-tools/inspector";
import { JazzReactProvider } from "jazz-tools/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { apiKey } from "./common.ts";
import { Account } from "./schema.ts";
import { Settings } from "./settings/Settings.tsx";
import { NewPostPage } from "./new-post/NewPostPage.tsx";
import { Authenticated } from "./Authenticated.tsx";
import { Layout } from "./Layout.tsx";
import { GlobalFeed } from "./feed/GlobalFeed.tsx";
import { NotFoundPage } from "./NotFoundPage.tsx";
import { ProfilePage } from "./profile/ProfilePage.tsx";
import { ProfileRedirect } from "./ProfileRedirect.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JazzReactProvider
      sync={{
        peer: `wss://cloud.jazz.tools/?key=${apiKey}`,
      }}
      AccountSchema={Account}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index Component={GlobalFeed} />
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
            <Route
              path="/me"
              Component={() => (
                <Authenticated>
                  <ProfileRedirect />
                </Authenticated>
              )}
            />
            <Route path="/users/:userId" Component={ProfilePage} />
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <JazzInspector />
    </JazzReactProvider>
  </StrictMode>
);
