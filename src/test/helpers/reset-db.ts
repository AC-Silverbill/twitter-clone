import { db } from "~/server/db";

export const resetDB = async () => {
    await db.$transaction([db.account.deleteMany(), db.session.deleteMany(), db.user.deleteMany(), db.verificationToken.deleteMany()]);
};
