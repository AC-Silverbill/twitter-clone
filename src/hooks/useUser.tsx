import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import placeholderProfile from "~/utils/example";

interface Props {
    [propname: string]: any;
}

export type UserContextType = {
    twitterProfile: Profile;
    isLoading: boolean;
};

export const UserContextProvider = (props: Props) => {
    //TODO: add case for unauthenticated

    //@ts-ignore
    const profileMutation = api.user.getMe.useQuery();

    return (
        <UserContext.Provider
            value={
                !profileMutation?.isSuccess
                    ? { twitterProfile: placeholderProfile, isLoading: true }
                    : { twitterProfile: profileMutation!.data! as Profile, isLoading: false }
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
