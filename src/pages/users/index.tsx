import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserContent from "../../components/content/UserContent";

export default function Home() {
    const { twitterUser } = useUser();
    return (
        <Layout>
            <Content>
                <UserContent twitterUser={twitterUser} />
            </Content>
        </Layout>
    );
}
