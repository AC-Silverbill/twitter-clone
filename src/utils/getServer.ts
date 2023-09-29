import { api } from "./api";

const RESTs = {
    getTweetAll: api.tweet.getTweetsAll.useQuery,
};

const getServer = <T extends keyof typeof RESTs>(route: T) => {};

export default getServer;
