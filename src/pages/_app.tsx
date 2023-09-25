import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import UserProvider from "~/providers/UserProvider";
import ModalProvider from "~/providers/ModalProvider";

//include providers here when needed
const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <SessionProvider session={session}>
            <UserProvider>
                <ModalProvider />
                <Component {...pageProps} />
            </UserProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
