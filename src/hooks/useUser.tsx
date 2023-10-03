import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import useTRPC from "./useTRPC";
import { useRouter } from "next/router";

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
    tweets: 4,
    likes: [],
};

export const UserContextProvider = (props: Props) => {
    //TODO: add case for unauthenticated

    // uncomment and fix later
    // const router = useRouter();
    // const myProfile = useTRPC("GET", "user", "getMe").start({ params: [], useEffectDependencies: [router.asPath] });

    const myProfile = api.user.getMe.useQuery();
    console.log(myProfile);
    return (
        <UserContext.Provider
            value={
                !myProfile.isSuccess
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
