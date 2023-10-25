import { type Prisma } from "@prisma/client";
import { type Profile, type Tweet } from "~/types";

export const tweetInclude = {
    author: true,
    retweetReference: {
        select: {
            id: true,
            author: true,
            content: true,
            timeCreated: true,
        },
    },
    replyReference: {
        select: {
            id: true,
            author: true,
            content: true,
            timeCreated: true,
        },
    },
    _count: {
        select: {
            retweets: true,
            replies: true,
            likes: true,
        },
    },
} satisfies Prisma.TweetInclude;

export type TweetPayload = Prisma.TweetGetPayload<{ include: typeof tweetInclude }>;

export const tweetMapper = (tweet: TweetPayload): Tweet => {
    return {
        id: tweet.id,
        author: tweet.author as Profile,
        type: tweet.type,
        content: tweet.content!,
        attachments: tweet.attachments,
        timeCreated: tweet.timeCreated,
        retweets: tweet._count.retweets,
        replies: tweet._count.replies,
        likes: tweet._count.likes,
        reference:
            tweet.type === "RETWEET"
                ? {
                      id: tweet.retweetReference!.id,
                      author: tweet.retweetReference!.author as Profile,
                      content: tweet.retweetReference!.content!,
                      timeCreated: tweet.retweetReference!.timeCreated,
                  }
                : tweet.type === "REPLY"
                ? {
                      id: tweet.replyReference!.id,
                      author: tweet.replyReference!.author as Profile,
                      content: tweet.replyReference!.content!,
                      timeCreated: tweet.replyReference!.timeCreated,
                  }
                : undefined,
    };
};
