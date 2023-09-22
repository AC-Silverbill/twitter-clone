import React from "react";
import ExampleProvider from "~/providers/ExampleProvider";
import { api } from "~/utils/api";

import Head from "./Head";
//include providers here when needed
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head></Head>
            <ExampleProvider>{children}</ExampleProvider>
        </>
    );
};

export default Layout;
