import { describe, expect, it, beforeEach } from "vitest";
import { db } from "~/server/db";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { type Session } from "next-auth";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

describe("User Test", () => {
    let ctx1: { session: Session | null; db: PrismaClient };
    let ctx2: { session: Session | null; db: PrismaClient };

    const createUserContext = async (name: string, email: string) => {
        const { id, isAuthenticated } = await db.user.create({
            data: {
                name,
                email,
            },
        });
        return createInnerTRPCContext({
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
    };

    beforeEach(async () => {
        ctx1 = await createUserContext("Kat", "Kat@Kat.com");
        ctx2 = await createUserContext("Aerys", "Aerys@Aerys.com");
    });

    describe("Profile", () => {
        it("should create a profile for a new user", async () => {
            const api = appRouter.user.createCaller(ctx1);
            await api.createProfile({
                nickname: "Kat Kat Kat",
                username: "KattyKat",
            });
            const user = await db.user.findUnique({
                where: {
                    id: ctx1.session?.user.id,
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

        it("should throw if the username already exists", async () => {
            const api1 = appRouter.user.createCaller(ctx1);
            const api2 = appRouter.user.createCaller(ctx2);
            await api1.createProfile({
                nickname: "Kat Kat Kat",
                username: "KattyKat",
            });
            await expect(
                api2.createProfile({
                    nickname: "Aerys Aerys Aerys",
                    username: "KattyKat",
                })
            ).rejects.toThrow(
                new TRPCError({
                    code: "CONFLICT",
                    message: "username already used",
                })
            );
        });

        it("shouldn't allow users to create more than 1 profile", async () => {
            const api = appRouter.user.createCaller(ctx1);
            await api.createProfile({
                nickname: "Kat Kat Kat Kat",
                username: "KattyKat",
            });
            await expect(
                api.createProfile({
                    nickname: "Kat Kat Kat Kat",
                    username: "KattyKat",
                })
            ).rejects.toThrow(
                new TRPCError({
                    code: "CONFLICT",
                    message: "username already used",
                })
            );
        });

        it("should update a profile", function () {});

        it("should throw when updating a profile if username is already used", function () {});

        it("should get a profile", function () {});
    });

    describe("Follow", () => {
        it("should follow a user", function () {});

        it("shouldn't allow someone to follow a user more than once", function () {});

        it("shouldn't allow you to follow yourself", function () {});

        it("should unfollow a user", function () {});

        it("should throw when unfollowing if a user isn't already followed", function () {});

        it("should get followers", function () {});

        it("should get followings", function () {});
    });

    it("should error from zod validation", async () => {
        const api = appRouter.user.createCaller(ctx1);
        await expect(
            api.createProfile({
                nickname: "",
                username: "",
            })
        ).rejects.toThrow();
    });
});
