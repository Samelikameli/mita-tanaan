import { extendTheme } from "@chakra-ui/react";

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
});

export { theme };
