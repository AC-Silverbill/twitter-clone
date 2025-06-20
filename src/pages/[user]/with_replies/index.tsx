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
    const repliesTRPC = api.tweet.getRepliesFromUser.useQuery({ username: username });

    if (profileTRPC.isLoading) {
        return <LoadingFeed />;
    }

    if (profileTRPC.isError) {
        return (
            <ErrorFeed>
                <div className="flex justify-center items-center">Error getting profile</div>
            </ErrorFeed>
        );
    }

    const Posts = () => {
        //TODO: fix likes feed
        if (repliesTRPC.isLoading) {
            return <LoadingFeedChild />;
        }

        if (profileTRPC.isError) {
            return (
                <ErrorFeedChild>
                    <div>Error getting posts</div>
                </ErrorFeedChild>
            );
        }

        if (repliesTRPC.data?.length === 0) {
            return <div className="flex justify-center items-center p-2">No replies found :(</div>;
        } else {
            return repliesTRPC.data?.map((reply) => (
                <Tweet tweet={reply} key={`a replied message to ${reply.author.username} [${reply.id}]`} />
            ));
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
