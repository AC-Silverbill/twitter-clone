import { type PrismaClient } from "@prisma/client";
import { type Profile } from "~/types";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";
import { TweetRepository } from "~/server/repositories/TweetRepository";
import { LikeRepository } from "~/server/repositories/LikeRepository";

export class RepositoryFactory {
    constructor(
        protected db: PrismaClient,
        protected profile: Profile
    ) {}

    get tweet(): TweetRepository {
        return new TweetRepository(this.db, this.profile);
    }

    get like(): LikeRepository {
        return new LikeRepository(this.db, this.profile);
    }

    get bookmark(): BookmarkRepository {
        return new BookmarkRepository(this.db, this.profile);
    }
}
