import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { env } from "~/env.mjs";
import { ourFileRouter } from "~/server/uploadthing";

const handler = createNextPageApiHandler({ router: ourFileRouter });

export default handler;
