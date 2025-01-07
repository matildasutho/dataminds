import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import AppWithRouter from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWithRouter />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);
