"use client";

import React from "react";
import { useSession } from "next-auth/react";
import useAuthModal from "~/hooks/useAuthModal";
import useNavigation from "~/navigation";
import getLocal from "~/utils/getLocal";
import { BasicComponentWithChildren } from "~/types";
import { twMerge } from "tailwind-merge";

interface FeedProps extends BasicComponentWithChildren {}

const Feed = ({ children, className }: FeedProps) => {
    const { data } = useSession();
    const { isOpen, openAuthModal } = useAuthModal();
    if (!isOpen && (!data || !data.user)) {
        openAuthModal();
    }

    return <div className={twMerge(`flex flex-col`, className)}>{children}</div>;
};

export default Feed;
