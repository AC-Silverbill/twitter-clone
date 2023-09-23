import React from "react";

//###############GENERIC TYPES################
//its more than likely that these would be used outside of this project
type AnyEmail<T extends string> = `${T}@${T}`;

/**
 * @interface BasicComponentWithChildren
 * @param children: React.ReactNode
 * @param className?: string
 */
export interface BasicComponentWithChildren {
    children: React.ReactNode;
    className?: string;
}

/**
 * @interface AnyRoute
 * @type: any string with a `/` in the beginning
 */
export type AnyRoute<T extends string> = `/${T}`;

export type ContentComponent = React.ReactNode & {};

//###############PROJECT TYPES###############
//specific to the project, and probably wouldnt see outside use

//TODO: because some of these should be database models, refactor it to be references to certain other things, rather than just string/number literals

/**
 * @interface TwitterUser
 * @param id: number
 * @param email: string, that includes '@'
 * @param username: string
 * @param user: string
 * @param profileImageID: number
 * @param bio: string
 */
export interface TwitterUser {
    id: number;
    email: AnyEmail<string>;
    user: string;
    username?: string;
    profileImageID?: number;
    bio?: string;
}

/**
 * @interface Tweet
 * @param id: number
 * @param authorId: number
 * @param postId: number
 * @param content: string
 * @param attachments?: string -
 * @param likes: number[], that are userIDs
 * @param retweets: number[], that are tweetIDs
 * @param reference: Tweet, which isn't the current one
 */
export interface Tweet {
    id: number;
    authorId: number;
    postId: number;
    content: string;
    attachments?: string;
    likes: number[]; // userIDs
    retweets: number[]; // tweetIDs
    reference?: Tweet;
}
