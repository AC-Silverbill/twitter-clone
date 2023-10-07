import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { updateScore } from "~/server/api/routers/user";
import { type Tweet } from "~/types";
import { tweetMapper } from "~/server/data-model";

export const bookmarkRouter = createTRPCRouter({
    postBookmark: protectedProcedure
        .input(
            z.object({
                tweetId: z.string(),
            })
        )
        .mutation(async ({ ctx, input: { tweetId } }) => {
            await ctx.repository.bookmark.createBookmark(tweetId);
            const tweet = await ctx.repository.tweet.getTweet(tweetId);
            await updateScore(ctx.db, ctx.profile.username, tweet.authorUsername, 20);
        }),

    removeBookmark: protectedProcedure
        .input(
            z.object({
                tweetId: z.string(),
            })
        )
        .mutation(async ({ ctx, input: { tweetId } }) => {
            await ctx.repository.bookmark.removeBookmark(tweetId);
        }),

    getBookmarks: protectedProcedure.query(async ({ ctx }): Promise<Tweet[]> => {
        const bookmarkedTweets = await ctx.repository.bookmark.getBookmarks();
        return bookmarkedTweets.map((bookmarkedTweet) => {
            return tweetMapper(bookmarkedTweet);
        });
    }),
});
