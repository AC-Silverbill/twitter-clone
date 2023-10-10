import type * as http from "http";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

import("~/env.mjs");

const globalThisWithServer = globalThis as unknown as {
    server: http.Server;
};

export const setup = () => {
    const { server } = createHTTPServer({
        router: appRouter,
        createContext: () => {
            return createInnerTRPCContext({ session: null });
        },
    });
    globalThisWithServer.server = server;
    server.listen(3000);
};

export const teardown = () => {
    if (globalThisWithServer.server) globalThisWithServer.server.close();
};
