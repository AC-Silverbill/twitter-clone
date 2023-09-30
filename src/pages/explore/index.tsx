import react from "react";
import useUser from "~/hooks/useUser/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import ExploreFeed from "~/components/feed/ExploreFeed";

export default function Home() {
    return (
        <Layout>
            <Content>
                <ExploreFeed />
            </Content>
        </Layout>
    );
}
