import { Repository } from "~/server/repositories/Repository";
import { tweetInclude, TweetPayload } from "~/server/data-model";

export class LikeRepository extends Repository {
    async likeTweet(tweetId: string) {
        await this.db.like.create({
            data: {
                likerUsername: this.profile.username,
                tweetId,
            },
        });
    }

    async getLikesFromUser(username: string): Promise<TweetPayload[]> {
        // TODO: order by time liked
        const likedTweets = await this.db.like.findMany({
            where: {
                likerUsername: username,
            },
            include: {
                tweet: {
                    include: tweetInclude,
                },
            },
        });
        return likedTweets.map((likedTweet) => likedTweet.tweet);
    }
}
