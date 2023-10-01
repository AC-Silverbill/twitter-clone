import { createTRPCRouter, getProfile, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { resetDB } from "~/test/helpers/reset-db";
import { type Profile } from "~/types";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    createProfile: publicProcedure
        .input(
            z.object({
                nickname: z.string().min(10),
                username: z.string().min(5),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { nickname, username } = input;
            if (await usernameExists(ctx.db, username)) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "username already used",
                });
            }
            await ctx.db.$transaction([
                ctx.db.profile.create({
                    data: {
                        userId: ctx.session?.user.id,
                        nickname,
                        username,
                        image: ctx.session?.user.image,
                    },
                }),
                ctx.db.user.update({
                    where: {
                        id: ctx.session?.user.id,
                    },
                    data: {
                        isAuthenticated: true,
                    },
                }),
            ]);
        }),

    getMe: protectedProcedure.use(getProfile).query(({ ctx }): Profile => {
        return ctx.profile;
    }),

    getProfile: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .query(async ({ ctx, input: { username } }): Promise<Profile> => {
            return (await ctx.db.profile.findUniqueOrThrow({
                where: {
                    username,
                },
            })) as Profile;
        }),

    followUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input }) => {
            const alreadyFollowing = await ctx.db.follow.count({
                where: {
                    followerUsername: ctx.profile.username,
                    followeeUsername: input.username,
                },
            });
            if (alreadyFollowing) {
                throw new TRPCError({ code: "CONFLICT", message: "you're already following the user" });
            }
            await ctx.db.follow.create({
                data: {
                    followerUsername: ctx.profile.username,
                    followeeUsername: input.username,
                },
            });
        }),

    unfollowUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .use(getProfile)
        .query(async ({ ctx, input }) => {
            const following = await ctx.db.follow.findFirst({
                where: {
                    followerUsername: ctx.profile.username,
                    followeeUsername: input.username,
                },
            });
            if (!following) {
                throw new TRPCError({ code: "CONFLICT", message: "you're not following the user" });
            }
            await ctx.db.follow.delete({
                where: {
                    id: following.id,
                },
            });
        }),

    getFollowers: protectedProcedure.use(getProfile).query(async ({ ctx }): Promise<Profile[]> => {
        const followers = await ctx.db.follow.findMany({
            where: {
                followeeUsername: ctx.profile.username,
            },
            include: {
                follower: true,
            },
        });
        return followers.map((follower): Profile => follower.follower as Profile);
    }),

    getFollowings: protectedProcedure.use(getProfile).query(async ({ ctx }) => {
        const followings = await ctx.db.follow.findMany({
            where: {
                followerUsername: ctx.profile.username,
            },
            include: {
                followee: true,
            },
        });
        return followings.map((following): Profile => following.followee as Profile);
    }),

    resetDB: publicProcedure.mutation(async () => {
        await resetDB();
    }),
});

const usernameExists = async (db: PrismaClient, username: string) => {
    const user = await db.profile.findUnique({
        where: {
            username,
        },
    });
    return !!user;
};
