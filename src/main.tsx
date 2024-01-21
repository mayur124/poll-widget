import type { TConfigurations } from "./types/configuration.ts";
import type { TLoader } from "./types/loader.ts";

import React from "react";
import ReactDOM from "react-dom/client";

import {
  createWrapperElement,
  isValidConfig,
  isWidgetAlreadyLoaded,
} from "./helpers";

import App from "./App.tsx";

import "./index.css";

declare global {
  interface Window {
    loadWidget: (rootElementId: string, config: TConfigurations) => void;
    [key: string]: unknown;
  }
}

(function () {
  const widgetStore = window.PollWidget as TLoader;
  for (const uniqueId in widgetStore || {}) {
    if (!widgetStore[uniqueId].c) {
      throw new Error("Configuration is not added.");
    }
    for (const pollConfig of widgetStore[uniqueId].c) {
      if (!isValidConfig(pollConfig)) {
        throw new Error("Widget is not properly configured.");
      }
      if (isWidgetAlreadyLoaded(uniqueId)) {
        throw new Error(
          `Widget with identifier [${uniqueId}] is already running.`
        );
      }
      const wrapperId = pollConfig.parentElementId || uniqueId;
      if (!pollConfig.parentElementId) {
        createWrapperElement(uniqueId);
      }
      renderWidget(uniqueId, wrapperId, pollConfig);
      window[`loaded-${uniqueId}`] = true;
    }
  }
})();

function renderWidget(
  uniqueId: string,
  rootElementId: string,
  config: TConfigurations
) {
  const root = document.getElementById(rootElementId)!;
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App uniqueId={uniqueId} pollConfig={config} />
    </React.StrictMode>
  );
}
