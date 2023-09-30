import { createContext, useContext } from "react";
import { Profile } from "~/types";

export type UserContextType = {
    twitterProfile: Profile;
    isLoading: boolean;
};

export const placeholderProfile: Profile = {
    id: "01",
    userId: "01",
    nickname: "01",
    username: "01",
    image: "/images/defaultprofile.svg",
    joinedAt: new Date(Date.now()),
    bio: "01",
    tweets: [],
    likes: [],
};

export const UserContext = createContext<UserContextType>({ twitterProfile: placeholderProfile, isLoading: true });

const useUser = () => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("You can only use useUser() in a UserProvider!");
    }

    return user;
};

export default useUser;
