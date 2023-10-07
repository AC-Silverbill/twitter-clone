import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
    getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.notification.count({
            where: {
                receiverProfileUsername: ctx.profile.username,
                isSeen: false,
            },
        });
    }),

    getAllNotification: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.notification.findMany({
            where: {
                receiverProfileUsername: ctx.profile.username,
            },
        });
    }),

    markAllAsSeen: protectedProcedure.mutation(async ({ ctx }) => {
        await ctx.db.notification.updateMany({
            where: {
                receiverProfileUsername: ctx.profile.username,
                isSeen: false,
            },
            data: {
                isSeen: true,
            },
        });
    }),
});
