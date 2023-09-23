import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { resetDB } from "~/test/helpers/reset-db";

export const userRouter = createTRPCRouter({
    finishSignUp: publicProcedure
        .input(
            z.object({
                name: z.string(),
                username: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, username } = input;
            await ctx.db.user.update({
                where: {
                    id: ctx.session?.user.id,
                },
                data: {
                    name,
                    username,
                    isAuthenticated: true,
                },
            });
        }),
    resetDB: publicProcedure.mutation(async () => {
        await resetDB();
    }),
});
