import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import "./index.css";
import AppContext from "./appcontext.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme.ts";

import "mapbox-gl/dist/mapbox-gl.css";

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_AUTH ?? ""));

// Create a client
const queryClient = new QueryClient();

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

export { app as firebaseApp };
