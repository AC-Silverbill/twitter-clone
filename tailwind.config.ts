import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "#2596be": "#2596be",
                "#e1eef6": "#e1eef6",
                "#8dccf7": "#8dccf7",
                "#1a8cd8": "#1a8cd8",
                "#849099": "#849099",
                "#3fc99b": "#3fc99b",
                "#fee7f2": "#fee7f2",
                "#f7f7f7": "#f7f7f7",
                "#3ac898": "#3ac898",
                "#def1eb": "#def1eb",
                "#eff3f4": "#eff3f4",
                "#e8f5fe": "#e8f5fe",
                "#e6e7e7": "#e6e7e7",
                "#fb9fa8": "#fb9fa8",
                "#f4212e": "#f4212e",
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /(hover\:)?(bg|text|border)-(\#2596be|\#e1eef6|\#8dccf7|\#1a8cd8|\#849099|\#3fc99b|pink-400|\#fee7f2|\#f7f7f7|\#3ac898|\#def1eb|\#eff3f4|\#e8f5fe|\#e6e7e7|\#fb9fa8|\#f4212e)/,
            variants: ["lg", "focus", "hover", "lg:hover", "group-hover", "disabled", "group-disabled"],
        },
    ],
} satisfies Config;
