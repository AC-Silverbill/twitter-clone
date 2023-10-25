import react from "react";
import { useRouter } from "next/router";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import placeholderProfile from "~/utils/example";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import ErrorFeed from "~/components/ErrorFeed";
import UserFeed from "~/components/feed/UserFeed";
import LoadingFeed from "~/components/LoadingFeed";
import ErrorFeedChild from "~/components/ErrorFeedChild";
import LoadingFeedChild from "~/components/LoadingFeedChild";
import Tweet from "~/components/Tweet";

export default function Home() {
    const router = useRouter();
    const username = router.query.user as string;
    const profileTRPC = api.user.getProfile.useQuery({ username: username });
    const likesTRPC = api.tweet.getLikesFromUser.useQuery({ username: username });

    if (profileTRPC.isLoading) {
        return <LoadingFeed />;
    }

    //TODO: mirror twitter's error message with no profile is found
    if (profileTRPC.isError) {
        return (
            <ErrorFeed>
                <div>Error getting profile</div>
            </ErrorFeed>
        );
    }

    const Posts = () => {
        if (likesTRPC.isLoading) {
            return <LoadingFeedChild />;
        }

        if (profileTRPC.isError) {
            return (
                <ErrorFeedChild>
                    <div>Error getting likes</div>
                </ErrorFeedChild>
            );
        }

        if (likesTRPC.data?.length === 0) {
            return <div className="flex justify-center items-center p-2">No likes found :(</div>;
        } else {
            return likesTRPC.data?.map((post) => <Tweet tweet={post} />);
        }
    };
    return (
        <Content>
            <UserFeed twitterProfile={profileTRPC.isSuccess ? profileTRPC.data! : placeholderProfile}>
                <Posts />
            </UserFeed>
        </Content>
    );
}
