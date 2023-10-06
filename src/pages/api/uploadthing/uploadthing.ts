import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { env } from "~/env.mjs";
import { ourFileRouter } from "~/server/uploadthing";

const handler = createNextPageApiHandler({
    router: ourFileRouter,
    config: { uploadthingSecret: env.UPLOADTHING_SECRET, uploadthingId: env.UPLOADTHING_APP_ID },
});

export default handler;
