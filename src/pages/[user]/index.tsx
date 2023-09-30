import react from "react";
import useUser from "~/hooks/useUser";
import { useRouter } from "next/router";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserFeed from "~/components/feed/UserFeed";
import Discovery from "~/components/Discovery";
import Custom404 from "../404";
import { api } from "~/utils/api";

export default function Home() {
    const router = useRouter();
    const username = router.asPath.replace(/\//, "");
    console.log("username", username);
    const test = api.user.getProfile.useQuery({ username: username });
    console.log(test.data);
    const { twitterProfile } = useUser();
    return (
        <Content>
            <UserFeed twitterProfile={twitterProfile} />
        </Content>
    );
}
