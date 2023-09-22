import Content from "~/components/Content";
import Layout from "~/components/Layout";
import NotificationsContent from "~/components/content/NotificationsContent";

export default function Home() {
    return (
        <Layout>
            <Content>
                <NotificationsContent />
            </Content>
        </Layout>
    );
}
