import { AnyRoute } from "~/types";

//some colors are similar cuz we are doing twitter clone,m but if things change we can
export const colors = {
    COLOR_PRIMARY: "#2596be",
    COLOR_PRIMARY_LIGHTER: "#e1eef6",
    COLOR_PRIMARY_DARKER: "#0f1419",
    COLOR_PRIMARY_DISABLED: "#8dccf7",
    COLOR_PRIMARY_HIGHLIGHTED: "#1a8cd8",
    COLOR_SECONDARY: "#849099",
    COLOR_TERTIARY: "#3fc99b",
    COLOR_PINK: "pink-400",
    COLOR_PINK_LIGHTER: "#fee7f2",
    COLOR_LIGHT_GRAY: "#f7f7f7",
    COLOR_LIGHT_GRAY_DARKER: "#efefef",
    COLOR_GREEN: "#3ac898",
    COLOR_GREEN_LIGHTER: "#def1eb",
    COLOR_BORDER: "#eff3f4",
    COLOR_WHITE_HIGHLIGHTED: "#e8f5fe",
    COLOR_WHITE_HIGHLIGHTED_DARKER: "#e6e7e7",
    COLOR_SELECTED: "#2596be",
    COLOR_WARNING: "#fb9fa8",
    COLOR_ERROR: "#f4212e",
} as const;

export const styles = {
    WHITE_BG: `rounded-3xl font-semibold p-2 px-4 border transition text-sm text-black bg-white hover:bg-${colors["COLOR_WHITE_HIGHLIGHTED"]} hover:scale-105`,
    PRIMARY_BG: `rounded-3xl font-semibold p-2 px-4 border transition text-sm text-white bg-${colors["COLOR_PRIMARY"]} hover:bg-${colors["COLOR_PRIMARY_HIGHLIGHTED"]} hover:scale-105`,
    TAB_GRAY_HOVER: `group flex-1 transition p-2 border-b-4 border-transparent hover:border-blue-500 hover:bg-${colors["COLOR_WHITE_HIGHLIGHTED_DARKER"]}`,
};

export const routes = {
    YOUR_HOME: "/home",
    YOUR_NOTIFICATIONS: "/notifications",
    YOUR_BOOKMARKS: "/i/bookmarks",
    USER_HOME: (username: string): AnyRoute<string> => `/${username}`,
    USER_REPLIES: (username: string): AnyRoute<string> => `/${username}/with_replies`,
    USER_MEDIA: (username: string): AnyRoute<string> => `/${username}/media`,
    USER_LIKES: (username: string): AnyRoute<string> => `/${username}/likes`,
    USER_TWEET: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}`,
    USER_TWEET_LIKES: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}/likes`,
    USER_TWEET_RETWEETS: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}/retweets`,
    USER_TWEET_QUOTES: (username: string, id: number): AnyRoute<string> => `/${username}/status/${id}/quotes`,
    FINISH_SIGNUP: "/user/finishSignUp",
} as const;

export const categories = {
    colors: colors,
    routes: routes,
    styles: styles,
};

//ways you will end up opening the AuthModal
export const authModalHeaders = {
    default: "default",
    reply: "reply",
    retweet: "retweet",
    like: "like",
    follow: "follow",
} as const;
