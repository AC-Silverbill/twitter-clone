import { Repository } from "~/server/repositories/Repository";
import { tweetInclude, type TweetPayload } from "~/server/data-model";

export class TweetRepository extends Repository {
    async createTweet(input: { content: string; attachments: string[] }) {
        await this.db.tweet.create({
            data: {
                authorUsername: this.profile.username,
                type: "TWEET",
                ...input,
            },
        });
    }

    async createRetweet(input: { content: string; attachments: string[]; retweetReferenceId: string }) {
        await this.db.tweet.create({
            data: {
                authorUsername: this.profile.username,
                type: "RETWEET",
                ...input,
            },
        });
    }

    async createReply(input: { content: string; attachments: string[]; replyReferenceId: string }) {
        await this.db.tweet.create({
            data: {
                authorUsername: this.profile.username,
                type: "REPLY",
                ...input,
            },
        });
    }

    async removeTweet(tweetId: string) {
        await this.db.tweet.delete({
            where: {
                id: tweetId,
                authorUsername: this.profile.username,
            },
        });
    }

    async getTweet(tweetId: string): Promise<TweetPayload> {
        return await this.db.tweet.findUniqueOrThrow({
            where: {
                id: tweetId,
            },
            include: tweetInclude,
        });
    }

    async getRetweetsFromTweet(tweetId: string): Promise<TweetPayload[]> {
        return await this.db.tweet.findMany({
            where: {
                retweetReferenceId: tweetId,
                type: "RETWEET",
            },
            include: tweetInclude,
            orderBy: {
                timeCreated: "desc",
            },
        });
    }

    async getRepliesFromTweet(tweetId: string): Promise<TweetPayload[]> {
        return await this.db.tweet.findMany({
            where: {
                replyReferenceId: tweetId,
                type: "REPLY",
            },
            include: tweetInclude,
            orderBy: {
                timeCreated: "desc",
            },
        });
    }

    async getTweetsFromUsername(username: string): Promise<TweetPayload[]> {
        return await this.db.tweet.findMany({
            where: {
                authorUsername: username,
                OR: [
                    {
                        type: "TWEET",
                    },
                    {
                        type: "RETWEET",
                    },
                ],
            },
            include: tweetInclude,
            orderBy: {
                timeCreated: "desc",
            },
        });
    }

    async getRepliesFromUsername(username: string): Promise<TweetPayload[]> {
        return await this.db.tweet.findMany({
            where: {
                authorUsername: username,
                type: "REPLY",
            },
            include: tweetInclude,
            orderBy: {
                timeCreated: "desc",
            },
        });
    }

    async getMediaFromUsername(username: string): Promise<TweetPayload[]> {
        return await this.db.tweet.findMany({
            where: {
                authorUsername: username,
                attachments: {
                    isEmpty: false,
                },
            },
            include: tweetInclude,
            orderBy: {
                timeCreated: "desc",
            },
        });
    }
}
