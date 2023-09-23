import react from "react";
import useUser from "~/hooks/useUser";
import { useRouter } from "next/router";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserContent from "~/components/content/UserContent";
import Discovery from "~/components/Discovery";
import Custom404 from "../404";

export default function Home() {
    const router = useRouter();
    const user = useUser();

    return (
        <Layout>
            <Content>
                <UserContent user={user} />
            </Content>
        </Layout>
    );
}
