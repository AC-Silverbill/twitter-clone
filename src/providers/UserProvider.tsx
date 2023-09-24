"use client";

import React from "react";
import { UserContextProvider, UserContextType } from "~/hooks/useUser";
import { BasicComponentWithChildren } from "~/types";

interface UserProviderProps extends BasicComponentWithChildren {}

const UserProvider = ({ children }: UserProviderProps) => {
    return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
