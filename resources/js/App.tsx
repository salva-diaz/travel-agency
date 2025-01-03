import "~/providers/sentry/sentry";
import "./bootstrap";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import "./../css/app.css";

import { Providers } from "./providers";
import { Router } from "./router";
import { Toasts } from "./ui";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "There's no #root div, something's wrong with our index.html",
  );
}

createRoot(root).render(
  <StrictMode>
    <Providers>
      {ReactDOM.createPortal(<Toasts />, document.body)}
      <Router />
    </Providers>
  </StrictMode>,
);
