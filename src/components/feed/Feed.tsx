"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import useAuthModal from "~/hooks/useAuthModal";
import { BasicComponentWithChildren } from "~/types";
import { twMerge } from "tailwind-merge";

interface FeedProps extends BasicComponentWithChildren {}

const Feed = ({ children, className }: FeedProps) => {
    const { data, status } = useSession();
    const { isOpen, openAuthModal } = useAuthModal();

    useEffect(() => {
        if (status === "unauthenticated") {
            openAuthModal("default");
        }
    }, [data, data?.user]);

    return <main className={twMerge(`flex flex-col`, className)}>{children}</main>;
};

export default Feed;
