import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type Profile, type Tweet } from "~/types";

export const tweetRouter = createTRPCRouter({
    postTweet: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.db.tweet.create({
            data: {
                authorId: ctx.session.user.id,
                content: input,
            },
        });
    }),

    postRetweet: protectedProcedure
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

    postReply: protectedProcedure
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

    postLike: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.db.like.create({
            data: {
                userId: ctx.session.user.id,
                tweetId: input,
            },
        });
    }),

    getAllTweets: protectedProcedure.query(async ({ ctx }): Promise<Tweet[]> => {
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
                type: tweet.type,
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

    getTweet: protectedProcedure.input(z.string().cuid()).query(async ({ ctx, input: tweetId }): Promise<Tweet> => {
        const tweet = await ctx.db.tweet.findUniqueOrThrow({
            where: {
                id: tweetId,
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
        return {
            id: tweet.id,
            author: tweet.author as Profile,
            type: tweet.type,
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
    }),

    getTweetsFromUser: protectedProcedure.input(z.string().cuid().optional()).query(async ({ ctx, input: userId }): Promise<Tweet[]> => {
        const tweets = await ctx.db.tweet.findMany({
            where: {
                authorId: userId ?? ctx.session.user.id,
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
                type: tweet.type,
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

    getRepliesFromUser: protectedProcedure.input(z.string().cuid().optional()).query(async ({ ctx, input: userId }) => {
        const replies = await ctx.db.tweet.findMany({
            where: {
                authorId: userId ?? ctx.session.user.id,
                type: "REPLY",
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
        return replies.map((reply): Tweet => {
            return {
                id: reply.id,
                author: reply.author as Profile,
                type: reply.type,
                content: reply.content!,
                timeCreated: reply.timeCreated,
                retweets: reply._count.retweets,
                replies: reply._count.replies,
                likes: reply._count.likes,
                reference:
                    reply.type === "RETWEET"
                        ? {
                              id: reply.retweetReference!.id,
                              author: reply.retweetReference!.author as Profile,
                              content: reply.retweetReference!.content!,
                          }
                        : reply.type === "REPLY"
                        ? {
                              id: reply.replyReference!.id,
                              author: reply.replyReference!.author as Profile,
                              content: reply.replyReference!.content!,
                          }
                        : undefined,
            };
        });
    }),

    getLikesFromUser: protectedProcedure.input(z.string().cuid().optional()).query(async ({ ctx, input: userId }): Promise<Tweet[]> => {
        const likes = await ctx.db.like.findMany({
            where: {
                userId: userId ?? ctx.session.user.id,
            },
            include: {
                user: true,
                tweet: {
                    include: {
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
                },
            },
        });
        return likes.map(
            (like): Tweet => ({
                id: like.tweetId,
                author: like.user as Profile,
                type: like.tweet.type,
                content: like.tweet.content!,
                timeCreated: like.tweet.timeCreated,
                retweets: like.tweet._count.retweets,
                replies: like.tweet._count.replies,
                likes: like.tweet._count.likes,
                reference:
                    like.tweet.type === "RETWEET"
                        ? {
                              id: like.tweet.retweetReference!.id,
                              author: like.tweet.retweetReference!.author as Profile,
                              content: like.tweet.retweetReference!.content!,
                          }
                        : like.tweet.type === "REPLY"
                        ? {
                              id: like.tweet.replyReference!.id,
                              author: like.tweet.replyReference!.author as Profile,
                              content: like.tweet.replyReference!.content!,
                          }
                        : undefined,
            })
        );
    }),

    getRepliesFromTweet: protectedProcedure.input(z.string().cuid()).query(async ({ ctx, input: tweetId }): Promise<Tweet[]> => {
        const replies = await ctx.db.tweet.findMany({
            where: {
                id: tweetId,
                type: "REPLY",
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
        return replies.map((reply): Tweet => {
            return {
                id: reply.id,
                author: reply.author as Profile,
                type: reply.type,
                content: reply.content!,
                timeCreated: reply.timeCreated,
                retweets: reply._count.retweets,
                replies: reply._count.replies,
                likes: reply._count.likes,
                reference:
                    reply.type === "RETWEET"
                        ? {
                              id: reply.retweetReference!.id,
                              author: reply.retweetReference!.author as Profile,
                              content: reply.retweetReference!.content!,
                          }
                        : reply.type === "REPLY"
                        ? {
                              id: reply.replyReference!.id,
                              author: reply.replyReference!.author as Profile,
                              content: reply.replyReference!.content!,
                          }
                        : undefined,
            };
        });
    }),
});
