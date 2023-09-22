import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
    test: {
        globalSetup: "./src/test/globalSetup.ts",
    },
    resolve: {
        alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
    },
});
