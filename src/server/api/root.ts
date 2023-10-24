import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { tweetRouter } from "~/server/api/routers/tweet";
import { bookmarkRouter } from "~/server/api/routers/bookmark";
import { notificationRouter } from "~/server/api/routers/notification";
import { likeRouter } from "~/server/api/routers/like";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    user: userRouter,
    tweet: tweetRouter,
    like: likeRouter,
    bookmark: bookmarkRouter,
    notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
