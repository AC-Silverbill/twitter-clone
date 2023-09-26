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
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /(hover\:)?(bg|text|border)-(\#2596be|\#1A8cd8|\#849099|\#eff3f4|\#e8f5fe|\#e6e7e7)/,
            variants: ["lg", "hover", "focus", "lg:hover", "group-hover"],
        },
    ],
} satisfies Config;
