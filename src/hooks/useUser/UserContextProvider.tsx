"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { UserContext, UserContextType } from "./useUser";

interface Props {
    [propname: string]: any;
}

const UserContextProvider = async (props: Props) => {
    const { status, data } = useSession();
    //TODO: add case for unauthenticated

    const myProfile = api.user.getMe.useQuery();

    const value: UserContextType = {
        twitterProfile: myProfile.data,
        isLoading: false,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export default UserContextProvider;
