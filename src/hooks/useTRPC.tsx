import { api } from "~/utils/api";

const GET = {
    user: {
        getFollowers: api.user.getFollowers.useQuery,
        getFollowings: api.user.getFollowings.useQuery,
        getMe: api.user.getMe.useQuery,
        getProfile: api.user.getProfile.useQuery,
    },
    tweet: {
        getAllTweets: api.tweet.getAllTweets.useQuery,
        getLikesFromUser: api.tweet.getLikesFromUser.useQuery,
        getRepliesFromTweet: api.tweet.getRepliesFromTweet.useQuery,
        getRepliesFromUser: api.tweet.getRepliesFromUser.useQuery,
        getTweet: api.tweet.getTweet.useQuery,
        getTweetsFromUser: api.tweet.getTweetsFromUser.useQuery,
    },
} as const;

const POST = {
    user: {
        getFollowers: api.user.createProfile.useMutation,
        getFollowings: api.user.followUser.useMutation,
    },
    tweet: {
        postLike: api.tweet.postLike.useMutation,
        postReply: api.tweet.postReply.useMutation,
        postRetweet: api.tweet.postRetweet.useMutation,
        postTweet: api.tweet.postTweet.useMutation,
    },
} as const;

const DELETE = {
    user: {
        unfollowUser: api.user.unfollowUser.useMutation,
    },
} as const;

const categories = {
    GET,
    POST,
    DELETE,
} as const;

const useTRPC = <T extends keyof typeof categories, K extends keyof (typeof categories)[T], A extends keyof (typeof categories)[T][K], O extends >(
    method: T,
    category: K,
    action: A
) => {
    return categories[method][category][action];
};

useTRPC("GET", "user", "getFollowings")

export default useTRPC;
