import { parseArgs } from "node:util";
import { db } from "~/server/db";
import { faker } from "@faker-js/faker";
import { resetDB } from "~/test/helpers/reset-db";

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

(async () => {
    if (reset) await resetDB();
    const users = [];
    const profiles = [];
    const tweets = [];
    for (let i = 0; i < PROFILE_NUM; i++) {
        // TODO: use cuid instead
        const userId = faker.string.nanoid();
        const profileId = faker.string.nanoid();
        const profileUsername = faker.internet.userName();
        users.push({
            id: userId,
            name: faker.person.firstName(),
            email: faker.internet.email(),
            isAuthenticated: true,
        });
        profiles.push({
            id: profileId,
            userId,
            nickname: faker.person.firstName(),
            username: profileUsername,
        });
        for (let i = 0; i < Math.floor(Math.random()); i++) {
            tweets.push({
                id: faker.string.nanoid(),
                authorUsername: profileUsername,
                content: faker.lorem.lines(3),
            });
        }
    }
    await db.$transaction([
        db.user.createMany({ data: users }),
        db.profile.createMany({ data: profiles }),
        db.tweet.createMany({ data: tweets }),
    ]);

    const ops = [];
    for (let i = 0; i < profiles.length; i++) {
        const randomIndex = getRandomIndex(profiles.length, i);
        ops.push(
            db.popularityScore.create({
                data: {
                    profileId: profiles[i]!.id,
                    followingId: profiles[randomIndex]!.id,
                    score: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
                },
            })
        );
    }
    await db.$transaction(ops);
})()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async () => {
        await db.$disconnect();
        process.exit(1);
    });
