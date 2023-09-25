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
 */
export interface Profile {
    id: string;
    userId: string;
    name: string;
    username: string;
    image?: string;
    bio?: string;
    joinedAt: Date;
}

/**
 * @interface Tweet
 * @param id: number
 * @param authorId: number
 * @param postId: number
 * @param content: string
 * @param attachments?: string[]
 * @param likes: number[], that are userIDs
 * @param retweets: number[], that are tweetIDs
 * @param reference: Tweet, which isn't the current one
 * @param timeCreated: Date
 */
export interface Tweet {
    id: number;
    authorId: number;
    author: TwitterUser;
    postId: number;
    content: string;
    attachments?: string;
    likes: number[]; // userIDs
    retweets: number[]; // tweetIDs
    reference?: Tweet;
    timeCreated: string;
}
