import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { updateScore } from "~/server/api/routers/user";
import { type Tweet } from "~/types";
import { tweetMapper } from "~/server/data-model";


export const likeRouter = createTRPCRouter({
    likeTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .mutation(async ({ ctx, input: { tweetId } }) => {
            await ctx.repository.like.likeTweet(tweetId);
            const tweet = await ctx.repository.tweet.getTweet(tweetId);
            if (tweet.authorUsername !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
        }),

    unlikeTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .mutation(async ({ ctx, input: { tweetId } }) => {
            await ctx.repository.like.unlikeTweet(tweetId);
        }),

    getLikesFromUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Tweet[]> => {
            const likedTweets = await ctx.repository.like.getLikesFromUser(username);
            if (username !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, username, 20);
            return likedTweets.map((tweet): Tweet => tweetMapper(tweet));
        }),

    getLikesFromTweet: protectedProcedure
        .input(
            z.object({
                tweetId: z.string().cuid(),
            })
        )
        .query(async ({ ctx, input: { tweetId } }) => {
            const likerProfiles = await ctx.repository.like.getLikesFromTweet(tweetId);
            const tweet = await ctx.repository.tweet.getTweet(tweetId);
            if (tweet.authorUsername !== ctx.profile.username) await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
            return likerProfiles;
        }),
});