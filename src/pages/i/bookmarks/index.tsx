import react from "react";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import BookmarksFeed from "~/components/feed/BookmarksFeed";

export default function Home() {
    return (
        <Layout>
            <Content>
                <BookmarksFeed />
            </Content>
        </Layout>
    );
}
