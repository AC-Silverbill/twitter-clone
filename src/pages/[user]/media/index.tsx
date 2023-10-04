import react from "react";
import { useRouter } from "next/router";
import { Profile } from "~/types";
import { api } from "~/utils/api";
import useUser from "~/hooks/useUser";
import placeholderProfile from "~/utils/example";

import Content from "~/components/Content";
import UserFeed from "~/components/feed/UserFeed";

export default function Home() {
    const router = useRouter();
    const username = router.asPath.replace(/\//, "");
    const test = api.user.getProfile.useQuery({ username: username });
    const { twitterProfile, isLoading } = useUser();

    return (
        <Content>
            <UserFeed twitterProfile={isLoading ? placeholderProfile : twitterProfile!}>
                <div>media</div>
            </UserFeed>
        </Content>
    );
}
