import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserFeed from "../../components/feed/UserFeed";

export default function Home() {
    const { twitterUser } = useUser();
    return (
        <Layout>
            <Content>
                <UserFeed twitterUser={twitterUser} />
            </Content>
        </Layout>
    );
}
