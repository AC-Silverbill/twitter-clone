import { Repository } from "~/server/repositories/Repository";
import { tweetInclude, type TweetPayload } from "~/server/data-model";
import { type Profile } from "~/types";

export class LikeRepository extends Repository {
    async likeTweet(tweetId: string) {
        await this.db.like.create({
            data: {
                likerUsername: this.profile.username,
                tweetId,
            },
        });
    }

    async unlikeTweet(tweetId: string) {
        await this.db.like.delete({
            where: {
                likerUsername_tweetId: {
                    likerUsername: this.profile.username,
                    tweetId,
                },
            },
        });
    }

    async getLikesFromUser(username: string): Promise<TweetPayload[]> {
        const likedTweets = await this.db.like.findMany({
            where: {
                likerUsername: username,
            },
            include: {
                tweet: {
                    include: tweetInclude,
                },
            },
            orderBy: {
                timeLiked: "desc",
            },
        });
        return likedTweets.map((likedTweet) => likedTweet.tweet);
    }

    async getLikesFromTweet(tweetId: string): Promise<Profile[]> {
        const likedTweets = await this.db.like.findMany({
            where: {
                tweetId,
            },
            include: {
                liker: true,
            },
        });
        return likedTweets.map((like) => like.liker as Profile);
    }
}
