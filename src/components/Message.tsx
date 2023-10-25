import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ReferenceTweet, Tweet } from "~/types";
import getLocals from "~/utils/getLocals";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useAuthModal from "~/hooks/useAuthModal";
import ProfilePicture from "./ProfilePicture";
import ProfileHandle from "./ProfileHandle";
import Actions from "~/utils/Actions";

type MessageProps =
    | {
          tweet: Tweet;
          reference?: never;
      }
    | {
          tweet?: never;
          reference: ReferenceTweet;
      };

const Message = ({ tweet, reference }: MessageProps) => {
    const [timeSinceString, setTimeSinceString] = useState<string>("");
    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_BORDER, COLOR_LIGHT_GRAY, COLOR_LIGHT_GRAY_DARKER } = getLocals("colors");
    const { openAuthModal } = useAuthModal();

    if (tweet) {
        useEffect(() => {
            setTimeSinceString(Actions.convertDateToLastCreatedTwitterTime(tweet.timeCreated));
        }, []);
        return (
            <div className={`p-4 flex cursor-pointer w-full border-${COLOR_BORDER}  hover:bg-${COLOR_LIGHT_GRAY_DARKER}`}>
                <ProfilePicture twitterProfile={tweet.author} />
                <div className="flex flex-col px-4 flex-1 h-full">
                    <div className="flex gap-2">
                        <h2 className="font-bold">{tweet.author.nickname ?? tweet.author.username}</h2>
                        <ProfileHandle twitterProfile={tweet.author} className="self-center" />
                        <div>·</div>
                        <div>{timeSinceString}</div>
                    </div>
                    <div className="_line-break-anywhere flex justify-self-end">{tweet.content}</div>
                </div>
            </div>
        );
    }

    if (reference) {
        useEffect(() => {
            // console.log(reference);
            // setTimeSinceString(Actions.convertDateToLastCreatedTwitterTime(reference.timeCreated));
        }, []);
        return (
            <div className={`p-4 flex cursor-pointer w-full border-${COLOR_BORDER}  hover:bg-${COLOR_LIGHT_GRAY_DARKER}`}>
                <ProfilePicture twitterProfile={reference.author} />
                <div className="flex flex-col px-4 flex-1 h-full">
                    <div className="flex gap-2">
                        <h2 className="font-bold">{reference.author.nickname ?? reference.author.username}</h2>
                        <ProfileHandle twitterProfile={reference.author} className="self-center" />
                        <div>·</div>
                        <div>{timeSinceString}</div>
                    </div>
                    <div className="_line-break-anywhere flex justify-self-end">{reference.content}</div>
                </div>
            </div>
        );
    }
};

export default Message;
