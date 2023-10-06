import { Repository } from "~/server/repositories/Repository";
import { tweetInclude, type TweetPayload } from "~/server/data-model";

export class TweetRepository extends Repository {
    async getTweet(tweetId: string): Promise<TweetPayload> {
        return await this.db.tweet.findUniqueOrThrow({
            where: {
                id: tweetId,
            },
            include: tweetInclude,
        });
    }
}
