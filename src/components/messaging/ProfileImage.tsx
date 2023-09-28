import React from "react";
import Image from "next/image";
import { Profile } from "~/types";

interface ProfileImageProps {
    twitterProfile: Profile;
}

const ProfileImage = ({ twitterProfile }: ProfileImageProps) => {
    return (
        <div>
            <Image
                src={`/images/test1.png`}
                alt={`Profile Picture of ${twitterProfile.name}`}
                width={40}
                height={40}
                className="rounded-full flex flex-initial"
            />
        </div>
    );
};

export default ProfileImage;
