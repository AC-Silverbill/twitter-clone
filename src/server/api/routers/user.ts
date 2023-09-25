import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { resetDB } from "~/test/helpers/reset-db";
import { Profile } from "~/types";

export const userRouter = createTRPCRouter({
    createProfile: publicProcedure
        .input(
            z.object({
                name: z.string(),
                username: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, username } = input;
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
});
