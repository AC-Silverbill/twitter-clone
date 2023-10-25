import { Profile } from "~/types";

type exampleType = "one" | "two";
const exampleUsers: { [propname in exampleType]: Profile } = {
    one: {
        id: "12dj1d1idj1dko1",
        userId: "asdjakdhkjh1e",
        nickname: "kat123",
        username: "Kat",
        image: "/images/test1.png",
        bio: "today i ordered pizza",
        joinedAt: new Date(2023, 9, 20),
    },
    two: {
        id: "54353295u230",
        userId: "fdafdjhfqfjk",
        nickname: "aerysishere",
        username: "Aerys",
        image: "/images/test2.png",
        bio: ":love_you_gesture:",
        joinedAt: new Date(2023, 9, 1),
    },
} as const;

//TODO: instead call for the backend API route and return type/interface of Profile
export const getTwitterProfile = <K extends keyof typeof exampleUsers>(userID: K): Profile => {
    return exampleUsers[userID];
};
