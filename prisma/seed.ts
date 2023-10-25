import { parseArgs } from "node:util";
import { db } from "~/server/db";
import { faker } from "@faker-js/faker";
import { resetDB } from "./reset-db";
import { createId as createCUID } from "@paralleldrive/cuid2";

const ranges = [0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75] as const;
const getRandomIndexInRange = () => {
    const randomNumber = Math.random();
    return ranges.findIndex((range, index) => randomNumber > (ranges[index - 1] ?? 0) && randomNumber < ranges[index]!) ?? -1;
};

const {
    values: { reset },
} = parseArgs({
    options: {
        reset: { type: "boolean" },
    },
});

const PROFILE_NUM = 100;

const getRandomIndex = (length: number, i: number): number => {
    const index = Math.floor(Math.random() * length);
    if (index === i) getRandomIndex(length, i);
    return index;
};

const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

(async () => {
    if (reset) await resetDB();
    // ################# Create users and profiles #################
    const users = [];
    const profiles = [];
    for (let i = 0; i < PROFILE_NUM; i++) {
        // TODO: use cuid instead
        const user = {
            id: createCUID(),
            name: faker.person.firstName(),
            email: faker.internet.email(),
            isAuthenticated: true,
        };
        const profile = {
            id: createCUID(),
            userId: user.id,
            nickname: faker.person.firstName(),
            username: faker.internet.userName(),
        };
        users.push(user);
        profiles.push(profile);
    }
    await db.$transaction([db.user.createMany({ data: users }), db.profile.createMany({ data: profiles })]);

    // ################# Generate random tweets #################
    const tweets = [];
    for (const profile of profiles) {
        for (let i = 0; i < randomNumberInRange(10, 20); i++) {
            tweets.push({
                id: createCUID(),
                authorUsername: profile.username,
                content: faker.lorem.lines(3),
                timeCreated: faker.date.anytime(),
            });
        }
    }

    await db.$transaction([db.tweet.createMany({ data: tweets })]);

    // ################# Generate likes for random tweets #################
    const likes: { tweetId: string; likerUsername: string }[] = [];
    for (const tweet of tweets) {
        for (let i = 0; i < randomNumberInRange(1, 200); i++) {
            const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
            if (!randomProfile) continue;
            const matchLike = likes.filter((like) => like.tweetId === tweet.id && like.likerUsername === randomProfile.username);
            if (!matchLike.length)
                likes.push({
                    tweetId: tweet.id,
                    likerUsername: randomProfile.username,
                });
        }
    }

    await db.$transaction([db.like.createMany({ data: likes })]);

    // ################# Generate scores for random users #################
    // const scores = [];
    // for (let i = 0; i < profiles.length; i++) {
    //     for (let j = 0; j < 30; j++) {
    //         const randomIndex = getRandomIndex(profiles.length, i);
    //         scores.push({
    //             profileUsername: profiles[i]!.username,
    //             followingUsername: profiles[randomIndex]!.username,
    //             score: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    //         });
    //     }
    // }
    // await db.$transaction([db.popularityScore.createMany({ data: scores })]);

    // const topFollowings = await db.popularityScore.findMany({
    //     where: {
    //         profileId: profiles[3]!.id,
    //     },
    //     orderBy: {
    //         score: "desc",
    //     },
    //     select: {
    //         followingId: true,
    //         score: true,
    //     },
    //     take: 20,
    // });
    // const chosenProfiles: string[] = [];
    // for (let i = 0; i < 20; i++) {
    //     if (i < 3) chosenProfiles.push(topFollowings[i]!.followingId);
    //     else {
    //         const index = getRandomIndexInRange();
    //         if (index < 0) {
    //             // TODO: just fetch something
    //         } else chosenProfiles.push(topFollowings[index]!.followingId);
    //     }
    // }
    // const feedTweets = [];
    // for (const profileId of chosenProfiles) {
    //     console.log(profileId);
    //     const tweet = await db.tweet.findFirst({
    //         where: {
    //             author: {
    //                 id: profileId,
    //             },
    //         },
    //         orderBy: {
    //             timeCreated: "desc",
    //         },
    //         skip: 2,
    //     });
    //     feedTweets.push(tweet);
    // }
    // console.log(feedTweets);
})()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async () => {
        await db.$disconnect();
        process.exit(1);
    });
