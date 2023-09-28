import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const tweetRouter = createTRPCRouter({
    tweet: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.db.tweet.create({
            data: {
                authorId: ctx.session.user.id,
                content: input,
            },
        });
    }),
});
