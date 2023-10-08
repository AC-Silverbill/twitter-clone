import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { updateScore } from "~/server/api/routers/user";
import { tweetInclude, tweetMapper, type TweetPayload } from "~/server/data-model";
import { type Tweet } from "~/types";

export const tweetRouter = createTRPCRouter({
    postTweet: protectedProcedure
        .input(
            z.object({
                content: z.string(),
                attachments: z.string().array().max(4),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.repository.tweet.createTweet(input);
        }),

    postRetweet: protectedProcedure
        .input(
            z.object({
                retweetReferenceId: z.string().cuid(),
                content: z.string(),
                attachments: z.string().array().max(4),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.repository.tweet.createRetweet(input);
            const retweet = await ctx.repository.tweet.getTweet(input.retweetReferenceId);
            if (retweet.authorUsername !== ctx.profile.username)
                await updateScore(ctx.db, ctx.profile.username, retweet.authorUsername, 20);
        }),

    postReply: protectedProcedure
        .input(
            z.object({
                replyReferenceId: z.string().cuid(),
                content: z.string(),
                attachments: z.string().array().max(4),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.repository.tweet.createReply(input);
            const reply = await ctx.repository.tweet.getTweet(input.replyReferenceId);
            if (reply.authorUsername !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, reply.authorUsername, 20);
        }),

    removeTweet: protectedProcedure.input(z.object({ tweetId: z.string() })).mutation(async ({ ctx, input: { tweetId } }) => {
        await ctx.repository.tweet.removeTweet(tweetId);
    }),

    getFeedForYou: protectedProcedure
        .input(
            z.object({
                skip: z.number(),
            })
        )
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
        .query(async ({ ctx, input: { skip } }) => {
            // TODO: maybe use cursor
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
        .query(async ({ ctx, input: { tweetId } }): Promise<Tweet> => {
            const tweet = await ctx.repository.tweet.getTweet(tweetId);
            if (tweet.authorUsername !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
            return tweetMapper(tweet);
        }),

    getTweetsFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const tweets: TweetPayload[] = await ctx.repository.tweet.getTweetsFromUsername(username);
            if (username !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, username, 20);
            return tweets.map((tweet) => tweetMapper(tweet));
        }),

    getRepliesFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const replies: TweetPayload[] = await ctx.repository.tweet.getRepliesFromUsername(username);
            if (username !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, username, 20);
            return replies.map((reply) => tweetMapper(reply));
        }),

    getMediaFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }) => {
            const mediaTweets: TweetPayload[] = await ctx.repository.tweet.getMediaFromUsername(username);
            if (username !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, username, 20);
            return mediaTweets.map((tweet) => tweetMapper(tweet));
        }),

    getRetweetsFromTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .query(async ({ ctx, input: { tweetId } }) => {
            const retweets = await ctx.repository.tweet.getRetweetsFromTweet(tweetId);
            return retweets.map((retweet) => tweetMapper(retweet));
        }),

    getRepliesFromTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .query(async ({ ctx, input: { tweetId } }): Promise<Tweet[]> => {
            const replies: TweetPayload[] = await ctx.repository.tweet.getRepliesFromTweet(tweetId);
            const tweet = await ctx.repository.tweet.getTweet(tweetId);
            if (tweet.authorUsername !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
            return replies.map((reply) => tweetMapper(reply));
        }),
});
