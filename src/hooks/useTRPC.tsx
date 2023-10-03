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
};

const POST = {
    user: {
        createProfile: api.user.createProfile.useMutation,
        followUser: api.user.followUser.useMutation,
    },
    tweet: {
        postLike: api.tweet.postLike.useMutation,
        postReply: api.tweet.postReply.useMutation,
        postRetweet: api.tweet.postRetweet.useMutation,
        postTweet: api.tweet.postTweet.useMutation,
    },
};

const DELETE = {
    user: {
        unfollowUser: api.user.unfollowUser.useMutation,
    },
};

const categories = {
    GET,
    POST,
    DELETE,
};

type testing = Parameters<(typeof categories)["POST"]["user"]["followUser"]>;

const useTRPC = <
    T extends keyof typeof categories,
    K extends keyof (typeof categories)[T],
    A extends keyof (typeof categories)[T][K],
    O extends Parameters<(typeof categories)[T][K][A]>,
>(
    method: T,
    category: K,
    action: A
) => {
    return categories[method][category][action];
};

useTRPC("GET", "user", "getProfile")({ username: "asda" });

function myFunction(myParam: string) {}
function myOtherFunction(myParam: string) {}

const myObject = {
    test: {
        what: myFunction,
        ishere: myOtherFunction,
    } as const,
} as const;

type testing2<T extends keyof typeof myObject, K extends keyof (typeof myObject)[T]> = (typeof myObject)[T][K];

myObject.test.ishere.arguments;
const whatis: testing2<"test", "what"> = [];

export default useTRPC;
