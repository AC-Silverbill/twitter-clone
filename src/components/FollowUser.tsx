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
        if (isFollowed) {
            const unfollowTRPC = api.user.unfollowUser.useQuery({ username: twitterProfile.username });
            setIsFollowed(false);
        } else {
            const followTRPC = api.user.followUser.useQuery({ username: twitterProfile.username });
            setIsFollowed(true);
        }
    };

    return (
        <Button buttonTemplate="PRIMARY_BG" onClick={handleClick}>
            {}
        </Button>
    );
};

export default FollowUser;
