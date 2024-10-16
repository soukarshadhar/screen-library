import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./styles/index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
