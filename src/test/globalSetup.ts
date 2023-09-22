import * as dotenv from "dotenv";
import * as path from "path";
import("~/env.mjs");

const envPath: string = path.resolve(__dirname, "../" + "../" + ".env.test");
export const setup = () => {
    dotenv.config({ path: envPath });
};
