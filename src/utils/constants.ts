//some colors are similar cuz we are doing twitter clone,m but if things change we can
export const colors = {
    COLOR_PRIMARY: "#2596be",
    COLOR_SECONDARY: "#ffffff",
    COLOR_SECONDARY_TINT: "#f0ecec",
    COLOR_SELECTED: "#2596be",
} as const;

export const routes = {
    YOUR_HOME: "/home",
    YOUR_EXPLORE: "/explore",
    YOUR_NOTIFICATIONS: "/notifications",
    YOUR_BOOKMARKS: "/i/bookmarks",
    USER_HOME: (username: string) => `/${username}`,
    USER_REPLIES: (username: string) => `/${username}/with_replies`,
    USER_MEDIA: (username: string) => `/${username}/media`,
    USER_TWEET: (username: string, id: number) => `/${username}/status/${id}`,
    USER_TWEET_LIKES: (username: string, id: number) => `/${username}/status/${id}/likes`,
    USER_TWEET_RETWEETS: (username: string, id: number) => `/${username}/status/${id}/retweets`,
    USER_TWEET_QUOTES: (username: string, id: number) => `/${username}/status/${id}/quotes`,
    FINISH_SIGNUP: "/user/finishSignUp",
};
