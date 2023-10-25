import Content from "~/components/Content";
import Layout from "~/components/Layout";
import NotificationsFeed from "~/components/feed/NotificationsFeed";

export default function Home() {
    return (
        <Layout>
            <Content>
                <NotificationsFeed />
            </Content>
        </Layout>
    );
}
