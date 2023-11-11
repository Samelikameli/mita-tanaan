import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import "./index.css";
import AppContext from "./appcontext.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_AUTH ?? ""));

// Create a client
const queryClient = new QueryClient();

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
    colors: {
        brand: {
            900: "#1a365d",
            800: "#153e75",
            700: "#2a69ac",
        },
        background: {
            100: "#DEE7F3",
        },
    },
    fonts: {
        body: "Rubik, system-ui, sans-serif",
        heading: "Rubik, Georgia, serif",
        mono: "Menlo, monospace",
    },
    radii: {
        none: "0",
        sm: "0.125rem",
        base: "2.5rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={app}>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </AppContext.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
);

if (window.innerHeight < window.innerWidth) {
    document.body.parentElement?.classList.add("desktop");
} else {
    document.body.parentElement?.classList.add("mobile");
}
