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

    retweet: protectedProcedure
        .input(
            z.object({
                referenceId: z.string().cuid(),
                content: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { referenceId, content } = input;
            await ctx.db.tweet.create({
                data: {
                    authorId: ctx.session.user.id,
                    referenceId,
                    content,
                    type: "RETWEET",
                },
            });
        }),

    reply: protectedProcedure
        .input(
            z.object({
                referenceId: z.string().cuid(),
                content: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { referenceId, content } = input;
            await ctx.db.tweet.create({
                data: {
                    authorId: ctx.session.user.id,
                    referenceId,
                    content,
                    type: "REPLY",
                },
            });
        }),

    like: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.db.like.create({
            data: {
                userId: ctx.session.user.id,
                tweetId: input,
            },
        });
    }),
});
