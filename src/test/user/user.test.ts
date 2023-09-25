import { describe, expect, it, beforeEach } from "vitest";
import { db } from "~/server/db";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { type Session } from "next-auth";
import { type PrismaClient } from "@prisma/client";

describe("User Test", () => {
    let ctx: { session: Session | null; db: PrismaClient };

    beforeEach(async () => {
        const { id, name, email, isAuthenticated } = await db.user.create({
            data: {
                name: "Kat",
                email: "Kat@Kat.com",
            },
        });
        ctx = createInnerTRPCContext({
            session: {
                user: {
                    id,
                    name,
                    email,
                    isAuthenticated,
                },
                expires: "",
            },
        });
    });

    it("should create a profile for a new user", async () => {
        const api = appRouter.user.createCaller(ctx);
        await api.createProfile({
            name: "Kat",
            username: "KattyKat",
        });
        const user = await db.user.findUnique({
            where: {
                id: ctx.session?.user.id,
            },
        });
        const profile = await db.profile.count({
            where: {
                userId: user?.id,
            },
        });
        expect(user?.isAuthenticated).toBeTruthy();
        expect(profile).toBe(1);
    });

    it("should throw if the username already exists", function () {});

    it("shouldn't allow users to create more than 1 profile", function () {});

    it("should check for the length of input", function () {});
});
