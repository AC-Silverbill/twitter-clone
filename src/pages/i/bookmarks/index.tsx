import react from "react";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import BookmarksContent from "~/components/content/BookmarksContent";

export default function Home() {
    const user = useUser();
    return (
        <Layout>
            <Content>
                <BookmarksContent />
            </Content>
        </Layout>
    );
}
