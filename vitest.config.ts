import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
    test: {
        setupFiles: "./src/test/helpers/setup.ts",
        globalSetup: "./src/test/helpers/global-setup.ts",
    },
    resolve: {
        alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
    },
});
