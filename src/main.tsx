import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import {
  applyResolvedTheme,
  getStoredThemePreference,
  getSystemPrefersDark,
  resolveTheme,
} from "./lib/theme";
import { routes } from "./routes.tsx";

applyResolvedTheme(
  resolveTheme(getStoredThemePreference(), getSystemPrefersDark())
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
