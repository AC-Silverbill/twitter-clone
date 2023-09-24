import React from "react";
import UserProvider from "~/providers/UserProvider";
import { api } from "~/utils/api";

import Head from "./Head";
import Content from "./Content";
//include providers here when needed
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head></Head>
            <UserProvider>{children}</UserProvider>
        </>
    );
};

export default Layout;
