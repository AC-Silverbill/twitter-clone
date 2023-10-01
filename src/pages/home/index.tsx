import react from "react";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import HomeFeed from "~/components/feed/HomeFeed";

export default function Home() {
    return (
        <Layout>
            <Content>
                <HomeFeed />
            </Content>
        </Layout>
    );
}
