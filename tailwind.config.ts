import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "#2596be": "#2596be",
                "#1a8cd8": "#1a8cd8",
                "#849099": "#849099",
                "#eff3f4": "#eff3f4",
                "#e8f5fe": "#e8f5fe",
                "#e6e7e7": "#e6e7e7",
                "#3fc99b": "#3fc99b",
                "#8dccf7": "#8dccf7",
                "#fb9fa8": "#fb9fa8",
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /(hover\:)?(bg|text|border)-(\#2596be|\#1A8cd8|\#849099|\#eff3f4|\#e8f5fe|\#e6e7e7|\#3fc99b|\#8dccf7|\#fb9fa8|pink-400)/,
            variants: ["lg", "focus", "hover", "lg:hover", "group-hover", "disabled", "group-disabled"],
        },
    ],
} satisfies Config;
