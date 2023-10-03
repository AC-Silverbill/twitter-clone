"use client";

import { useEffect } from "react";
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

//    O extends Parameters<(typeof categories)[T][K][A]>,

// function myFunction(myParam: number, myParam2: { name: string }) {}
// function myOtherFunction(myParam: string) {}

// const myObject = {
//     test: { what: myFunction, ishere: myOtherFunction },
// };

// const exampleFunction = <T extends keyof typeof myObject, K extends keyof (typeof myObject)[T]>(category: T, something: K) => {
//     const item = myObject[category][something];
//     return {
//         item: item,
//         call: (...params: Parameters<typeof item>) => item(...params),
//     };
// };

// const test4 = exampleFunction("test", "ishere");
// const test5 = exampleFunction("test", "what");

// test5.call(42, { name: "asdad" });
// test4.call("adsajsdajad");

export const useTRPC = <
    T extends keyof typeof categories,
    K extends keyof (typeof categories)[T],
    A extends keyof (typeof categories)[T][K],
>(
    method: T,
    category: K,
    action: A
) => {
    const item = categories[method][category][action];

    // @ts-ignore
    type paramsType = Parameters<typeof item>;
    const startTRPC = (args: { params?: paramsType; useEffectDependencies?: any[] }) => {
        type ItemFunction = (args?: any) => any & { useMutation?: any };
        const _item = item as ItemFunction;

        const returnValue = () => {
            if (args.params) {
                return _item(args.params);
            } else {
                return _item();
            }
        };
        useEffect(() => {
            return returnValue();
        }, [...(args?.useEffectDependencies ?? [])]);

        return returnValue();
    };

    return {
        item: item,
        start: startTRPC,
    };
};

export default useTRPC;
