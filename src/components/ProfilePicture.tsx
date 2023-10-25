import React from "react";
import Image from "next/image";
import { Profile } from "~/types";
import { twMerge } from "tailwind-merge";
import getLocal from "~/utils/getLocal";

const sizes = {
    LARGEST: 120,
    LARGE: 60,
    MEDIUM: 45,
    SMALL: 30,
};

interface ProfilePictureProps {
    twitterProfile: Profile;
    className?: string;
    size?: keyof typeof sizes;
}

const navigateToProfile = () => {};

const ProfilePicture = ({ twitterProfile, className, size = "MEDIUM" }: ProfilePictureProps) => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    return (
        <div className={twMerge(`flex-shrink-0 ${size}`, className)}>
            <Image
                src={twitterProfile.image || "/images/defaultprofile.svg"}
                alt={`Profile Picture of ${twitterProfile.username}`}
                width={sizes[size]}
                height={sizes[size]}
                className={`object-contain rounded-full flex flex-initial cursor-pointer hover:border-2 border-${primaryColor} transition`}
                onClick={navigateToProfile}
            />
        </div>
    );
};

export default ProfilePicture;
