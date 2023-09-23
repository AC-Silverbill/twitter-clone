import { AnyRoute } from "~/types";

//some colors are similar cuz we are doing twitter clone,m but if things change we can
export const colors = {
    COLOR_PRIMARY: "#2596be",
    COLOR_SECONDARY: "#849099",
    COLOR_BORDER: "#eff3f4",
    COLOR_HIGHLIGHTED: "#e6e7e7",
    COLOR_SELECTED: "#2596be",
} as const;

export const routes = {
    YOUR_HOME: "/home",
    YOUR_EXPLORE: "/explore",
    YOUR_NOTIFICATIONS: "/notifications",
    YOUR_BOOKMARKS: "/i/bookmarks",
    USER_HOME: (username: string): AnyRoute<string> => `/${username}`,
    USER_REPLIES: (username: string): AnyRoute<string> => `/${username}/with_replies`,
    USER_MEDIA: (username: string): AnyRoute<string> => `/${username}/media`,
    USER_TWEET: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}`,
    USER_TWEET_LIKES: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}/likes`,
    USER_TWEET_RETWEETS: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}/retweets`,
    USER_TWEET_QUOTES: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}/quotes`,
    FINISH_SIGNUP: "/user/finishSignUp",
} as const;
