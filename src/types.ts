import React from "react";

//###############GENERIC TYPES################
//its more than likely that these would be used outside of this project

/**
 * @interface AnyRoute
 * @type: any string with a `/` in the beginning
 */
export type AnyRoute<T extends string> = `/${T}`;
export type AnyEmail<T extends string> = `${T}@${T}`;
export type ContentComponent = React.ReactNode & {};

/**
 * @interface BasicComponentWithChildren
 * @param children: React.ReactNode
 * @param className?: string
 */
export interface BasicComponentWithChildren {
    children: React.ReactNode;
    className?: string;
}

//###############PROJECT TYPES###############
//specific to the project, and probably wouldnt see outside use

//TODO: because some of these should be database models, refactor it to be references to certain other things, rather than just string/number literals

/**
 * @interface TwitterUser
 * @param id: string
 * @param email: string, that includes '@'
 * @param name: string
 * @param image?: string
 * @param isAuthenticated: boolean
 * @param emailVerified?: Date
 */
export interface TwitterUser {
    id: string;
    email: AnyEmail<string>;
    name: string;
    image?: string;
    isAuthenticated: boolean;
    emailVerified?: Date;
}

/**
 * @interface Profile
 * @param id: string
 * @param userId: string
 * @param name: string
 * @param username: string
 * @param image?: string
 * @param bio?: string
 * @param joinedAt?: Date
 * @param tweets: Tweet[]
 * @param likes: Like[]
 */
export interface Profile {
    id: string;
    userId: string;
    name: string;
    username: string;
    image?: string;
    bio?: string;
    joinedAt: Date;
    tweets?: Tweet[];
    likes?: Like[];
}

const TweetType = {
    TWEET: 0,
    RETWEET: 1,
    REPLY: 2,
};

/**
 * @interface Tweet
 * @param id: string
 * @param type: "tweet" | "retweet" | "reply"
 * @param content?: string
 * @param timeCreated: Date
 * @param reference: Tweet, which isn't the current one
 * @param retweets: number
 * @param author: Profile
 * @param likes: number
 * @param replies: number
 */
export interface Tweet {
    id: string;
    author: Profile;
    type: keyof typeof TweetType;
    content: string;
    timeCreated: Date;
    reference?: ReferenceTweet;
    retweets: number;
    replies: number;
    likes: number;
}

export interface ReferenceTweet {
    id: string;
    author: Profile;
    content: string;
}

export interface Like {
    id: string;
    userId: string;
    tweetId: string;
    user: Profile;
    tweet: Tweet;
}
