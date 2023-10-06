import { PrismaClient } from "@prisma/client";
import { Profile } from "~/types";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";

export class RepositoryFactory {
    constructor(
        protected db: PrismaClient,
        protected profile: Profile
    ) {}

    get bookmark(): BookmarkRepository {
        return new BookmarkRepository(this.db, this.profile);
    }
}
