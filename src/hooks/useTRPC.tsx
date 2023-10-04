"use client";

import { createContext, useContext, useEffect } from "react";
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

interface Props {
    [propname: string]: any;
}

export type TRPCContextType = {
    call: (args: any) => any;
};

export const TRPCContextProvider = (props: Props) => {
    //TODO: add case for unauthenticated

    useEffect(() => categories.GET.tweet.getAllTweets(), []);

    return (
        <TRPCContext.Provider
            value={
{call:}
            }
            {...props}
        />
    );
};

export const TRPCContext = createContext<TRPCContextType>({ myFunction:  });

const useUser = () => {
    const user = useContext(TRPCContext);

    if (user === undefined) {
        throw new Error("You can only use useUser() in a UserProvider!");
    }

    return user;
};

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
    const newContext = createContext({call: (args?: paramsType) => {
        if(args) {
            item(args)
        } else {
            item()
        }
        )


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


        return returnValue();
    };

    return {
        item: item,
        start: startTRPC,
    };
};

useTRPC('GET', 'tweet', 'getLikesFromUser').start({params: [{username: 'adajsd'}]})

export default useTRPC;
