import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { resetDB } from "~/test/helpers/reset-db";

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
            await ctx.db.profile.create({
                data: {
                    userId: ctx.session?.user.id,
                    email: ctx.session?.user.email,
                    name,
                    username,
                },
            });
            await ctx.db.user.update({
                where: {
                    id: ctx.session?.user.id,
                },
                data: {
                    isAuthenticated: true,
                },
            });
        }),
    resetDB: publicProcedure.mutation(async () => {
        await resetDB();
    }),
});
