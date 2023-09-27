import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { resetDB } from "~/test/helpers/reset-db";
import { type Profile } from "~/types";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    createProfile: publicProcedure
        .input(
            z.object({
                name: z.string().min(10),
                username: z.string().min(5),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, username } = input;
            if (await usernameExists(ctx.db, username)) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "username already used",
                });
            }
            await ctx.db.$transaction([
                ctx.db.profile.create({
                    data: {
                        userId: ctx.session?.user.id,
                        name,
                        username,
                    },
                }),
                ctx.db.user.update({
                    where: {
                        id: ctx.session?.user.id,
                    },
                    data: {
                        isAuthenticated: true,
                    },
                }),
            ]);
        }),

    getMe: protectedProcedure.query(async ({ ctx }) => {
        return (await ctx.db.profile.findUniqueOrThrow({
            where: {
                id: ctx.session.user.id,
            },
        })) as Profile;
    }),

    getProfile: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
            })
        )
        .query(async ({ ctx, input }) => {
            return (await ctx.db.profile.findUniqueOrThrow({
                where: {
                    id: input.id,
                },
            })) as Profile;
        }),

    resetDB: publicProcedure.mutation(async () => {
        await resetDB();
    }),

    test: publicProcedure.input(z.string().min(5)).query(async () => {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "pedaret phot shod",
        });
        return "ddddddddddddddddddddddd";
    }),
});

const usernameExists = async (db: PrismaClient, username: string) => {
    const user = await db.profile.findUnique({
        where: {
            username,
        },
    });
    return !!user;
};
