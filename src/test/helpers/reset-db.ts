import { db } from "~/server/db";

export const resetDB = async () => {
    await db.$transaction([
        db.account.deleteMany(),
        db.session.deleteMany(),
        db.verificationToken.deleteMany(),
        db.user.deleteMany(),
        db.profile.deleteMany(),
        db.tweet.deleteMany(),
        db.reply.deleteMany(),
        db.retweet.deleteMany(),
        db.like.deleteMany(),
    ]);
};
