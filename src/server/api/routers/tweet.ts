import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type Profile, type Tweet, TweetType } from "~/types";

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
                    retweetReferenceId: referenceId,
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
                    replyReferenceId: referenceId,
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

    getTweetsAll: protectedProcedure.query(async ({ ctx }): Promise<Tweet[]> => {
        const tweets = await ctx.db.tweet.findMany({
            where: {
                OR: [
                    {
                        type: "TWEET",
                    },
                    {
                        type: "RETWEET",
                    },
                ],
            },
            include: {
                author: true,
                retweetReference: {
                    select: {
                        id: true,
                        author: true,
                        content: true,
                    },
                },
                replyReference: {
                    select: {
                        id: true,
                        author: true,
                        content: true,
                    },
                },
                _count: {
                    select: {
                        retweets: true,
                        replies: true,
                        likes: true,
                    },
                },
            },
        });
        return tweets.map((tweet): Tweet => {
            return {
                id: tweet.id,
                author: tweet.author as Profile,
                type: TweetType[tweet.type],
                content: tweet.content!,
                timeCreated: tweet.timeCreated,
                retweets: tweet._count.retweets,
                replies: tweet._count.replies,
                likes: tweet._count.likes,
                reference:
                    tweet.type === "RETWEET"
                        ? {
                              id: tweet.retweetReference!.id,
                              author: tweet.retweetReference!.author as Profile,
                              content: tweet.retweetReference!.content!,
                          }
                        : tweet.type === "REPLY"
                        ? {
                              id: tweet.replyReference!.id,
                              author: tweet.replyReference!.author as Profile,
                              content: tweet.replyReference!.content!,
                          }
                        : undefined,
            };
        });
    }),
});
