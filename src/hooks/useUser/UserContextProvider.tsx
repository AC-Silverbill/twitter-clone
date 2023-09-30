"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import { UserContext, UserContextType, placeholderProfile } from "./useUser";

interface Props {
    [propname: string]: any;
}

const UserContextProvider = (props: Props) => {
    const { status, data } = useSession();
    //TODO: add case for unauthenticated

    const myProfile = api.user.getMe.useQuery();

    return (
        <UserContext.Provider
            value={
                myProfile.isLoading
                    ? { twitterProfile: placeholderProfile, isLoading: false }
                    : { twitterProfile: myProfile.data!, isLoading: true }
            }
            {...props}
        />
    );
};

export default UserContextProvider;
