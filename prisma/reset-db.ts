import { db } from "~/server/db";

export const resetDB = async () => {
    // TODO: this file should be moved to prisma folder
    // TODO: CASCADE!
    await db.$transaction([
        db.account.deleteMany(),
        db.session.deleteMany(),
        db.verificationToken.deleteMany(),
        db.popularityScore.deleteMany(),
        db.user.deleteMany(),
        db.profile.deleteMany(),
        db.tweet.deleteMany(),
        db.like.deleteMany(),
    ]);
};
