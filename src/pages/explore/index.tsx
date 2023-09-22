import react from "react";
import useUser from "~/hooks/useUser";

import Content from "~/components/Content";
import Layout from "~/components/Layout";
import ExploreContent from "~/components/content/ExploreContent";

export default function Home() {
    const user = useUser();
    return (
        <Layout>
            <Content>
                <ExploreContent />
            </Content>
        </Layout>
    );
}
