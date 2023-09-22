import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        "text-[#2596be]",
        "text-[#eff3f4]",
        "text-[#e6e7e7]",
        "bg-[#2596be]",
        "bg-[#eff3f4]",
        "bg-[#e6e7e7]",
        "hover:text-[#2596be]",
        "hover:text-[#eff3f4]",
        "hover:text-[#e6e7e7]",
        "hover:bg-[#2596be]",
        "hover:bg-[#eff3f4]",
        "hover:bg-[#e6e7e7]",
    ],
} satisfies Config;
