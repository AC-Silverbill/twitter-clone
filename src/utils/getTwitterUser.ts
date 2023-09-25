import { TwitterUser } from "~/types";

export const getTwitterUser = async (twitterUserID: number): Promise<TwitterUser> => {
    return new Promise((res, rej) => {
        res(getTwitterTest());
    });
};

export const getTwitterTest = (): TwitterUser => {
    return {
        id: "s",
        email: "ds@gmail.com",
        name: "kat123",
        image: "T",
        isAuthenticated: true,
        emailVerified: new Date(2023, 9, 20),
    };
};
