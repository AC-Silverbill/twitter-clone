import { beforeEach } from "vitest";
import { resetDB } from "~/test/helpers/reset-db";

beforeEach(async () => {
    await resetDB();
});
