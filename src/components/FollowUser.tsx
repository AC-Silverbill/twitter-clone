import React, { useEffect, useState } from "react";
import { Profile } from "~/types";
import Button from "./Button";
import { api } from "~/utils/api";

interface FollowUserProps {
    twitterProfile: Profile;
}

const FollowUser = ({ twitterProfile }: FollowUserProps) => {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        const followedTRPC = api.user.getFollowings.useQuery();
    }, [isFollowed]);

    const handleClick = () => {
        const followMutationTRPC = api.user.followUser.useMutation();
        const unfollowMutationTRPC = api.user.unfollowUser.useMutation();

        if (isFollowed) {
            followMutationTRPC.mutate({ username: twitterProfile.username });
            setIsFollowed(false);
        } else {
            followMutationTRPC.mutate({ username: twitterProfile.username });
            setIsFollowed(true);
        }
    };

    return (
        <Button buttonTemplate="PRIMARY_BG" onClick={handleClick}>
            {isFollowed ? "Unfollow" : "Follow"}
        </Button>
    );
};

export default FollowUser;
