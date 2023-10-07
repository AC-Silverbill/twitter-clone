import { Repository } from "~/server/repositories/Repository";
import { tweetInclude, type TweetPayload } from "~/server/data-model";

export class BookmarkRepository extends Repository {
    async createBookmark(tweetId: string) {
        await this.db.bookmark.create({
            data: {
                bookmarkerUsername: this.profile.username,
                tweetId,
            },
        });
    }

    async removeBookmark(tweetId: string) {
        await this.db.bookmark.delete({
            where: {
                bookmarkerUsername_tweetId: {
                    bookmarkerUsername: this.profile.username,
                    tweetId,
                },
            },
        });
    }

    async getBookmarks(): Promise<TweetPayload[]> {
        const bookmarksWithTweets = await this.db.bookmark.findMany({
            where: {
                bookmarkerUsername: this.profile.username,
            },
            select: {
                tweet: {
                    include: tweetInclude,
                },
            },
            orderBy: { timeBookmarked: "desc" },
        });
        return bookmarksWithTweets.map((bookmarksWithTweet) => bookmarksWithTweet.tweet);
    }
}
