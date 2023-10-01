import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { Profile } from "~/types";
import { api } from "~/utils/api";

interface Props {
    [propname: string]: any;
}

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

export const UserContextProvider = (props: Props) => {
    const { status, data } = useSession();
    //TODO: add case for unauthenticated

    const myProfile = api.user.getMe.useQuery();

    return (
        <UserContext.Provider
            value={
                myProfile.isLoading
                    ? { twitterProfile: placeholderProfile, isLoading: true }
                    : { twitterProfile: myProfile.data!, isLoading: false }
            }
            {...props}
        />
    );
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
