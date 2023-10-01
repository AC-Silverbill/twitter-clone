import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type Profile, type Tweet } from "~/types";
import { type Prisma } from "@prisma/client";

const tweetInclude = {
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
} satisfies Prisma.TweetInclude;

type TweetPayload = Prisma.TweetGetPayload<{ include: typeof tweetInclude }>;

const tweetMapper = (tweet: TweetPayload): Tweet => {
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
};

export const tweetRouter = createTRPCRouter({
    postTweet: protectedProcedure.input(z.string()).mutation(async ({ ctx, input: content }) => {
        await ctx.db.tweet.create({
            data: {
                authorId: ctx.profile.id,
                content,
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
                    authorId: ctx.profile.id,
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
                    authorId: ctx.profile.id,
                    replyReferenceId: referenceId,
                    content,
                    type: "REPLY",
                },
            });
        }),

    postLike: protectedProcedure.input(z.string().cuid()).mutation(async ({ ctx, input: tweetId }) => {
        await ctx.db.like.create({
            data: {
                likerId: ctx.profile.id,
                tweetId,
            },
        });
    }),

    getAllTweets: protectedProcedure.query(async ({ ctx }): Promise<Tweet[]> => {
        const tweets: TweetPayload[] = await ctx.db.tweet.findMany({
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
            include: tweetInclude,
        });
        return tweets.map((tweet) => tweetMapper(tweet));
    }),

    getTweet: protectedProcedure
        .input(z.object({ tweetId: z.string().cuid() }))
        .query(async ({ ctx, input: { tweetId } }): Promise<Tweet> => {
            const tweet: TweetPayload = await ctx.db.tweet.findUniqueOrThrow({
                where: {
                    id: tweetId,
                },
                include: tweetInclude,
            });
            return tweetMapper(tweet);
        }),

    getTweetsFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const tweets: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    author: {
                        username,
                    },
                    OR: [
                        {
                            type: "TWEET",
                        },
                        {
                            type: "RETWEET",
                        },
                    ],
                },
                include: tweetInclude,
            });
            return tweets.map((tweet) => tweetMapper(tweet));
        }),

    getRepliesFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const replies: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    author: {
                        username,
                    },
                    type: "REPLY",
                },
                include: tweetInclude,
            });
            return replies.map((reply) => tweetMapper(reply));
        }),

    getLikesFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const likes = await ctx.db.like.findMany({
                where: {
                    liker: {
                        username,
                    },
                },
                include: {
                    tweet: {
                        include: tweetInclude,
                    },
                },
            });
            return likes.map((like): Tweet => tweetMapper(like.tweet));
        }),

    getRepliesFromTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .query(async ({ ctx, input: { tweetId } }): Promise<Tweet[]> => {
            const replies: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    replyReferenceId: tweetId,
                    type: "REPLY",
                },
                include: tweetInclude,
            });
            return replies.map((reply) => tweetMapper(reply));
        }),
});
