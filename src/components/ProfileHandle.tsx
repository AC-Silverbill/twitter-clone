import React from "react";
import Link from "next/link";
import { Profile } from "~/types";
import { twMerge } from "tailwind-merge";
import getLocal from "~/utils/getLocal";

interface ProfileHandleProps {
    twitterProfile: Profile;
    className?: string;
}

const ProfileHandle = ({ twitterProfile, className }: ProfileHandleProps) => {
    const secondaryColor = getLocal("colors", "COLOR_SECONDARY");

    //TODO: add onHover to show small user display box
    return (
        <Link
            href={`${twitterProfile.username}`}
            className={twMerge(`text-${secondaryColor}`, className)}
        >{`@${twitterProfile.username}`}</Link>
    );
};

export default ProfileHandle;
