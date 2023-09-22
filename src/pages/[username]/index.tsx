import react from "react";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import UserContent from "~/components/content/UserContent";
import Discovery from "~/components/Discovery";

export default function Home() {
    const user = useUser();
    return (
        <Layout>
            <Content>
                <UserContent user={user} />
            </Content>
        </Layout>
    );
}
