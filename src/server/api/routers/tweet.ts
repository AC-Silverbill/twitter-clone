import { createTRPCRouter, getProfile, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type Profile, type Tweet } from "~/types";
import { type Prisma } from "@prisma/client";
import { updateScore } from "~/server/api/routers/user";

export const tweetInclude = {
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

export type TweetPayload = Prisma.TweetGetPayload<{ include: typeof tweetInclude }>;

export const tweetMapper = (tweet: TweetPayload): Tweet => {
    return {
        id: tweet.id,
        author: tweet.author as Profile,
        type: tweet.type,
        content: tweet.content!,
        attachments: tweet.attachments,
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
    postTweet: protectedProcedure
        .input(
            z.object({
                content: z.string(),
                attachments: z.string().array().max(4),
            })
        )
        .use(getProfile)
        .mutation(async ({ ctx, input: { content, attachments } }) => {
            await ctx.db.tweet.create({
                data: {
                    authorUsername: ctx.profile.username,
                    content,
                    attachments,
                },
            });
        }),

    postRetweet: protectedProcedure
        .input(
            z.object({
                referenceId: z.string().cuid(),
                content: z.string(),
                attachments: z.string().array().max(4),
            })
        )
        .use(getProfile)
        .mutation(async ({ ctx, input }) => {
            const { referenceId, content, attachments } = input;
            await ctx.db.tweet.create({
                data: {
                    authorUsername: ctx.profile.username,
                    retweetReferenceId: referenceId,
                    content,
                    attachments,
                    type: "RETWEET",
                },
            });
            const retweetAuthor = await ctx.db.tweet.findUniqueOrThrow({
                where: {
                    id: referenceId,
                },
                select: {
                    authorUsername: true,
                },
            });
            await updateScore(ctx.db, ctx.profile.username, retweetAuthor.authorUsername, 20);
        }),

    postReply: protectedProcedure
        .input(
            z.object({
                referenceId: z.string().cuid(),
                content: z.string(),
                attachments: z.string().array().max(4),
            })
        )
        .use(getProfile)
        .mutation(async ({ ctx, input }) => {
            const { referenceId, content, attachments } = input;
            await ctx.db.tweet.create({
                data: {
                    authorUsername: ctx.profile.username,
                    replyReferenceId: referenceId,
                    content,
                    attachments,
                    type: "REPLY",
                },
            });
            const tweetAuthor = await ctx.db.tweet.findUniqueOrThrow({
                where: {
                    id: referenceId,
                },
                select: {
                    authorUsername: true,
                },
            });
            await updateScore(ctx.db, ctx.profile.username, tweetAuthor.authorUsername, 20);
        }),

    postLike: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .use(getProfile)
        .mutation(async ({ ctx, input: { tweetId } }) => {
            await ctx.db.like.create({
                data: {
                    likerUsername: ctx.profile.username,
                    tweetId,
                },
            });
            const tweetAuthor = await ctx.db.tweet.findUniqueOrThrow({
                where: {
                    id: tweetId,
                },
                select: {
                    authorUsername: true,
                },
            });
            await updateScore(ctx.db, ctx.profile.username, tweetAuthor.authorUsername, 20);
        }),

    getFeedForYou: protectedProcedure
        .input(
            z.object({
                skip: z.number(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { skip } }) => {
            const ranges = [0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75] as const;
            const getRandomIndex = () => {
                const randomNumber = Math.random();
                return ranges.findIndex((range, index) => randomNumber > (ranges[index - 1] ?? 0) && randomNumber < ranges[index]!) ?? -1;
            };
            const topFollowings = await ctx.db.popularityScore.findMany({
                where: {
                    profileUsername: ctx.profile.username,
                },
                orderBy: {
                    score: "desc",
                },
                take: 20,
            });
            if (topFollowings.length < 20) {
                // TODO: still involve the followings
                const topLatestTweets: TweetPayload[] = await ctx.db.tweet.findMany({
                    orderBy: {
                        likes: {
                            _count: "desc",
                        },
                    },
                    skip,
                    take: 20,
                    include: tweetInclude,
                });
                return topLatestTweets.map((tweet) => tweetMapper(tweet));
            }
            const chosenProfileUsernames: string[] = [];
            for (let i = 0; i < 20; i++) {
                if (i < 3) chosenProfileUsernames.push(topFollowings[i]!.followingUsername);
                else {
                    const index = getRandomIndex();
                    if (index < 0) {
                        // TODO: not so much random lol
                        const randomFollowing = await ctx.db.follow.findFirst({
                            where: {
                                followerUsername: ctx.profile.username,
                            },
                            select: {
                                followee: {
                                    select: {
                                        username: true,
                                    },
                                },
                            },
                            skip,
                        });
                        if (randomFollowing) if (randomFollowing.followee) chosenProfileUsernames.push(randomFollowing.followee.username);
                    } else chosenProfileUsernames.push(topFollowings[index]!.followingUsername);
                }
            }
            const feedTweets: TweetPayload[] = [];
            for (const username of chosenProfileUsernames) {
                const tweet = await ctx.db.tweet.findFirst({
                    where: {
                        authorUsername: username,
                    },
                    include: tweetInclude,
                    orderBy: {
                        timeCreated: "desc",
                    },
                    skip,
                });
                if (tweet) feedTweets.push(tweet);
            }
            return feedTweets.map((tweet) => tweetMapper(tweet));
        }),

    getFeedTrending: protectedProcedure
        .input(
            z.object({
                skip: z.number(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { skip } }) => {
            const topLatestTweets: TweetPayload[] = await ctx.db.tweet.findMany({
                orderBy: {
                    likes: {
                        _count: "desc",
                    },
                },
                skip,
                take: 20,
                include: tweetInclude,
            });
            return topLatestTweets.map((tweet) => tweetMapper(tweet));
        }),

    getTweet: protectedProcedure
        .input(z.object({ tweetId: z.string().cuid() }))
        .use(getProfile)
        .query(async ({ ctx, input: { tweetId } }): Promise<Tweet> => {
            const tweet: TweetPayload = await ctx.db.tweet.findUniqueOrThrow({
                where: {
                    id: tweetId,
                },
                include: tweetInclude,
            });
            await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
            return tweetMapper(tweet);
        }),

    getTweetsFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const tweets: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    authorUsername: username,
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
            await updateScore(ctx.db, ctx.profile.username, username, 20);
            return tweets.map((tweet) => tweetMapper(tweet));
        }),

    getRepliesFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const replies: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    authorUsername: username,
                    type: "REPLY",
                },
                include: tweetInclude,
            });
            await updateScore(ctx.db, ctx.profile.username, username, 20);
            return replies.map((reply) => tweetMapper(reply));
        }),

    getLikesFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const likes = await ctx.db.like.findMany({
                where: {
                    likerUsername: username,
                },
                include: {
                    tweet: {
                        include: tweetInclude,
                    },
                },
            });
            await updateScore(ctx.db, ctx.profile.username, username, 20);
            return likes.map((like): Tweet => tweetMapper(like.tweet));
        }),

    getMediaFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { username } }) => {
            const mediaTweets: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    authorUsername: username,
                    attachments: {
                        isEmpty: false,
                    },
                },
                include: tweetInclude,
            });
            await updateScore(ctx.db, ctx.profile.username, username, 20);
            return mediaTweets.map((tweet) => tweetMapper(tweet));
        }),

    getRepliesFromTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input: { tweetId } }): Promise<Tweet[]> => {
            const replies: TweetPayload[] = await ctx.db.tweet.findMany({
                where: {
                    replyReferenceId: tweetId,
                    type: "REPLY",
                },
                include: tweetInclude,
            });
            const tweet = await ctx.db.tweet.findUniqueOrThrow({
                where: {
                    id: tweetId,
                },
            });
            await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
            return replies.map((reply) => tweetMapper(reply));
        }),
});
