import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { initializeApp } from "firebase/app";

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_AUTH ?? ""));

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App app={app} />
    </React.StrictMode>,
);
