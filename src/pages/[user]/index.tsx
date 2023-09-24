import react from "react";
import useUser from "~/hooks/useUser";
import { useRouter } from "next/router";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserFeed from "~/components/feed/UserFeed";
import Discovery from "~/components/Discovery";
import Custom404 from "../404";

export default function Home() {
    const router = useRouter();
    const { twitterUser } = useUser();
    return (
        <Content>
            <UserFeed twitterUser={twitterUser} />
        </Content>
    );
}
