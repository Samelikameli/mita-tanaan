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
    apiKey: "AIzaSyAz1eHqLK1vPMEKJX58ewQyQte1FV1ijDo",
    authDomain: "junction-what-today.firebaseapp.com",
    projectId: "junction-what-today",
    storageBucket: "junction-what-today.appspot.com",
    messagingSenderId: "1009770398432",
    appId: "1:1009770398432:web:1ee720f178c7ded8ac4685",
};

const app = initializeApp(firebaseConfig);

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
