import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Content, Head } from "~/components";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
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
