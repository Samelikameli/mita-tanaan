import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import App from "./App.tsx";
import "./index.css";
import AppContext from "./appcontext.tsx";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_AUTH ?? ""));

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppContext.Provider value={app}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </AppContext.Provider>
    </React.StrictMode>,
);

if (window.innerHeight < window.innerWidth) {
    document.body.parentElement?.classList.add("desktop");
} else {
    document.body.parentElement?.classList.add("mobile");
}
