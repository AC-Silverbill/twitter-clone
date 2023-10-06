import { createTRPCRouter, getProfile, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { updateScore } from "~/server/api/routers/user";
import { tweetInclude, tweetMapper, type TweetPayload } from "~/server/api/routers/tweet";
import { type Tweet } from "~/types";

export const bookmarkRouter = createTRPCRouter({
    usingRepo: protectedProcedure.mutation(async ({ ctx }) => {
        console.log(await ctx.repository.bookmark.getBookmark());
    }),

    postBookmark: protectedProcedure
        .input(
            z.object({
                tweetId: z.string(),
            })
        )
        .use(getProfile)
        .mutation(async ({ ctx, input: { tweetId } }) => {
            await ctx.db.bookmark.create({
                data: {
                    bookmarkerUsername: ctx.profile.username,
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

    getBookmarks: protectedProcedure.use(getProfile).query(async ({ ctx }): Promise<Tweet[]> => {
        const bookmarkedTweets = await ctx.db.bookmark.findMany({
            where: {
                bookmarkerUsername: ctx.profile.username,
            },
            orderBy: { timeBookmarked: "desc" },
            include: {
                tweet: {
                    include: tweetInclude,
                },
            },
        });
        return bookmarkedTweets.map((bookmarkedTweet) => {
            return tweetMapper(bookmarkedTweet.tweet as TweetPayload);
        });
    }),
});
