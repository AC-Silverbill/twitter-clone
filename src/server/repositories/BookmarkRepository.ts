import { Repository } from "~/server/repositories/Repository";

export class BookmarkRepository extends Repository {
    async getBookmark() {
        return await this.db.tweet.findMany({});
    }
}
