import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserFeed from "../../components/feed/UserFeed";

export default function Home() {
    const { twitterProfile } = useUser();
    return (
        <Layout>
            <Content>
                <UserFeed twitterProfile={twitterProfile} />
            </Content>
        </Layout>
    );
}
