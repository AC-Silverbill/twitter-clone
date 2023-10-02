import react from "react";
import { useRouter } from "next/router";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import useUser from "~/hooks/useUser";

import Custom404 from "../404";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserFeed from "~/components/feed/UserFeed";
import Discovery from "~/components/Discovery";
import Loading from "~/components/Loading";

export default function Home() {
    const router = useRouter();
    const username = router.asPath.replace(/\//, "");
    const profileTRPC = api.user.getProfile.useQuery({ username: username });

    const placeholderProfile: Profile = {
        id: "01",
        userId: "01",
        nickname: "01",
        username: "01",
        image: "/images/defaultprofile.svg",
        joinedAt: new Date(Date.now()),
        bio: "01",
        tweets: [],
        likes: [],
    };

    if (profileTRPC.isLoading) {
        return <Loading />;
    }

    return (
        <Content>
            <UserFeed twitterProfile={profileTRPC.isSuccess ? profileTRPC.data! : placeholderProfile}>
                <div>posts</div>
            </UserFeed>
        </Content>
    );
}
