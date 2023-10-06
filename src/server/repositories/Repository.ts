import { PrismaClient } from "@prisma/client";
import { Profile } from "~/types";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";

export abstract class Repository {
    constructor(
        protected db: PrismaClient,
        protected profile: Profile
    ) {}
}
