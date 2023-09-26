import Image from "next/image";
import React, { useState } from "react";
import useUser from "~/hooks/useUser";
import { BasicComponentWithChildren } from "~/types";

const MakeTweet = () => {
    //TODO: make this generic to call for the user's Profile (with a getTwittterUser() maybe)
    const { twitterProfile } = useUser();

    const image = twitterProfile.image!;
    console.log(twitterProfile);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="p-4 flex border-b-[1px] border-${borderColor} w-full">
            <Image
                src={`/images/test1.png`}
                alt={`Profile Picture of ${twitterProfile.name}`}
                width={40}
                height={40}
                className="rounded-full flex flex-initial"
            />
            <input type="text" placeholder="What is happening?" />
        </div>
    );
};

export default MakeTweet;
