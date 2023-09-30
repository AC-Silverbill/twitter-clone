"use client";

import React from "react";
import UserContextProvider from "~/hooks/useUser/UserContextProvider";
import { BasicComponentWithChildren } from "~/types";

interface UserProviderProps extends BasicComponentWithChildren {}

const UserProvider = ({ children }: UserProviderProps) => {
    return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
