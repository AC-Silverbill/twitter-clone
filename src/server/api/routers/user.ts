import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    finishSignUp: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                username: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, name, username } = input;
            await ctx.db.user.update({
                where: {
                    id,
                },
                data: {
                    name,
                    username,
                    isAuthenticated: true,
                },
            });
        }),
});
