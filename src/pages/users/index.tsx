import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserContent from "./components/UserContent";

export default function Home() {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <Layout>
            <Content>
                <UserContent />
            </Content>
        </Layout>
    );
}
