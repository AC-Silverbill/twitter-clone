import { beforeEach } from "vitest";
import { resetDB } from "../../../prisma/reset-db";

beforeEach(async () => {
    await resetDB();
});
