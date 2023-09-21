import React from "react";
import { Head } from "~/components";

//include providers here when needed
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head></Head>
            {children}
        </>
    );
};

export default Layout;
