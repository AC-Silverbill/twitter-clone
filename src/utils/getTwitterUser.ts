import { TwitterUser } from "~/types";

export const getTwitterUser = async (twitterUserID: number): Promise<TwitterUser> => {
    return new Promise((res, rej) => {
        res(getTwitterTest());
    });
};

export const getTwitterTest = (): TwitterUser => {
    return {
        id: 1,
        email: "ds@gmail.com",
        name: "kat123",
        username: "Kat",
        image: "T",
        isAuthenticated: true,
        emailVerified: new Date(2023, 9, 20),
        bio: "hello",
        joinedAt: new Date(2023, 9, 10),
    };
};
