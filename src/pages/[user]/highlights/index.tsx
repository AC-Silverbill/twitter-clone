import react from "react";
import { useRouter } from "next/router";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import useUser from "~/hooks/useUser";

import Custom404 from "../../404";
import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserFeed from "~/components/feed/UserFeed";
import Discovery from "~/components/Discovery";

export default function Home() {
    const router = useRouter();
    const username = router.asPath.replace(/\//, "");
    const test = api.user.getProfile.useQuery({ username: username });
    const { twitterProfile, isLoading } = useUser();

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

    return (
        <Content>
            <UserFeed twitterProfile={isLoading ? placeholderProfile : twitterProfile!}>
                <div>highlights</div>
            </UserFeed>
        </Content>
    );
}
