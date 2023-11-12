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

const firebaseConfig = {
    apiKey: "AIzaSyD8Lql5vN3qD4OIV3xg1w-LO67zJjiJGNU",
    authDomain: "mita-tanaan.firebaseapp.com",
    projectId: "mita-tanaan",
    storageBucket: "mita-tanaan.appspot.com",
    messagingSenderId: "920419742489",
    appId: "1:920419742489:web:b19723ce9c6c6a67558b88",
};

const app = initializeApp(JSON.parse(firebaseConfig));

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
