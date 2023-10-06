import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { resetDB } from "../../../../prisma/reset-db";
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
                        userId: ctx.session!.user.id,
                        nickname,
                        username,
                        image: ctx.session!.user.image,
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

    updateProfile: protectedProcedure
        .input(
            z.object({
                nickname: z.string().optional(),
                username: z.string().optional(),
                bio: z.string().optional(),
                location: z.string().optional(),
                website: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { nickname, username, bio, location, website } = input;
            if (username) {
                if (await usernameExists(ctx.db, username)) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "username already used",
                    });
                }
            }
            await ctx.db.profile.update({
                where: {
                    username: ctx.profile.username,
                },
                data: {
                    nickname,
                    username,
                    bio,
                    location,
                    website,
                },
            });
        }),

    getMe: protectedProcedure.query(({ ctx }): Profile => {
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
        .mutation(async ({ ctx, input }) => {
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
            await updateScore(ctx.db, ctx.profile.username, input.username, 50);
        }),

    unfollowUser: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
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
            await ctx.db.popularityScore.delete({
                where: {
                    profileUsername_followingUsername: {
                        profileUsername: ctx.profile.username,
                        followingUsername: input.username,
                    },
                },
            });
        }),

    getFollowers: protectedProcedure.query(async ({ ctx }): Promise<Profile[]> => {
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

    getFollowings: protectedProcedure.query(async ({ ctx }) => {
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

export const updateScore = async (db: PrismaClient, profileUsername: string, followingUsername: string, score: number) => {
    const isFollowing = await db.follow.findUnique({
        where: {
            followerUsername_followeeUsername: {
                followerUsername: profileUsername,
                followeeUsername: followingUsername,
            },
        },
    });
    if (!isFollowing) score /= 2;
    await db.popularityScore.upsert({
        where: {
            profileUsername_followingUsername: {
                profileUsername,
                followingUsername,
            },
        },
        update: {
            score,
        },
        create: {
            profileUsername,
            followingUsername,
            score,
        },
    });
};
