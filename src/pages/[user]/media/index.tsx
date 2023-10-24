import react from "react";
import { useRouter } from "next/router";
import { Profile } from "~/types";
import Image from "next/image";
import { api } from "~/utils/api";
import placeholderProfile from "~/utils/example";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import ErrorFeed from "~/components/ErrorFeed";
import UserFeed from "~/components/feed/UserFeed";
import LoadingFeed from "~/components/LoadingFeed";
import ErrorFeedChild from "~/components/ErrorFeedChild";
import LoadingFeedChild from "~/components/LoadingFeedChild";
import Attachment from "~/components/Attachment";

export default function Home() {
    const router = useRouter();
    const username = router.query.user as string;
    const profileTRPC = api.user.getProfile.useQuery({ username: username });

    // TODO: rewrite this to be directed to getMedia route
    const mediaTRPC = api.tweet.getMediaFromUser.useQuery({ username: username });

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
        if (mediaTRPC.isLoading) {
            return <LoadingFeedChild />;
        }

        if (profileTRPC.isError) {
            return (
                <ErrorFeedChild>
                    <div>Error getting media</div>
                </ErrorFeedChild>
            );
        }

        if (mediaTRPC.data?.length === 0) {
            return <div className="flex justify-center items-center p-2">No media found :(</div>;
        } else {
            return mediaTRPC.data?.map((mediaTweet) => {
                return (
                    <div key={`${mediaTweet.id}'s attachments`}>
                        {mediaTweet.attachments.map((media, index) => (
                            <Attachment imageSource={media} key={`${media}[${index}]`} />
                        ))}
                    </div>
                );
            });
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
