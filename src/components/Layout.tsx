import React from "react";
import { Head } from "~/components";
import ExampleProvider from "~/providers/ExampleProvider";

//include providers here when needed
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head></Head>
            <ExampleProvider>{children}</ExampleProvider>
        </>
    );
};

export default Layout;
