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

    return (
        <Content>
            <div>media</div>
        </Content>
    );
}
