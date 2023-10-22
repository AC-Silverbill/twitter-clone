import React from "react";
import { useRouter } from "next/navigation";
import { Profile } from "~/types";
import getLocal from "~/utils/getLocal";

import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import getLocals from "~/utils/getLocals";

interface SearchBarUserProps {
    profile: Profile;
}

const SearchBarUser = ({ profile }: SearchBarUserProps) => {
    const { COLOR_SECONDARY, COLOR_LIGHT_GRAY } = getLocals("colors");
    const userRoute = getLocal("routes", "USER_HOME")(profile.username);
    const router = useRouter();

    const handleClick = () => {
        console.log("im clicking", userRoute);
        router.push(userRoute);
    };

    return (
        <>
            <Button className={`flex p-2 gap-2 hover:bg-${COLOR_LIGHT_GRAY} w-full`} onClick={handleClick}>
                <ProfilePicture twitterProfile={profile} size="MEDIUM" className="hover:border-0" />
                <div className="flex flex-col justify-start items-start">
                    <h4 className="font-bold">{profile.nickname}</h4>
                    <span className={`text-sm text-${COLOR_SECONDARY}`}>{`@${profile.username}`}</span>
                </div>
            </Button>
        </>
    );
};

export default SearchBarUser;
