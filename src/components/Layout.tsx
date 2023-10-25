import React from "react";
import UserProvider from "~/providers/UserProvider";
import { api } from "~/utils/api";

import Head from "./Head";
import Content from "./Content";
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
