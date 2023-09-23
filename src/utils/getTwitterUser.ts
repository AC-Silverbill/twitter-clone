import { TwitterUser } from "~/types";

const getTwitterUser = async (twitterUserID: number): Promise<TwitterUser> => {
    return new Promise((res, rej) => {
        res({
            id: 1,
            email: "ds@gmail.com",
            user: "kat123",
            username: "Kat",
            bio: "i am here",
            profileImageID: 12321,
        });
    });
};
