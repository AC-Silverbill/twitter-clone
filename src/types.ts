import React from "react";

//###############GENERIC TYPES################
//its more than likely that these would be used outside of this project
type ValidEmail<T extends string> = `${T}@${T}`;

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

/**
 * @interface TwitterUser
 * @param id: number
 * @param email: string that includes '@'
 * @param username: string
 * @param user: string
 * @param profileImage: string
 * @param bio: string
 */
export interface TwitterUser {
    id: number;
    email: ValidEmail<string>;
    user: string;
    username?: string;
    profileImage?: string;
    bio?: string;
}
