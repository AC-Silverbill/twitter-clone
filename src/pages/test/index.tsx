import react, { useState, useEffect } from "react";
import useUser from "~/hooks/useUser";
import returnFeedFromPopularFollowing from "~/server/algorithm/algorithm";

export default function Home() {
    const { twitterProfile } = useUser();
    const profiles = returnFeedFromPopularFollowing(twitterProfile);
    const colors = [
        "bg-red-300",
        "bg-red-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-blue-300",
        "bg-green-300",
    ];
    return (
        <div className="">
            {profiles.map((profile) => {
                return <div className={`pl-1 ${colors[profile.index]}`}>{profile.index}</div>;
            })}
        </div>
    );
}
