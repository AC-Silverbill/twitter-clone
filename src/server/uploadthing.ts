import type { NextApiRequest, NextApiResponse } from "next";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
const f = createUploadthing();

//TODO: add potential middleware if we need it
export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "64MB" } }).onUploadComplete(async ({ metadata, file }) => {
        console.log("file uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
