import React from "react";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";

interface TweetImageProps {
    attachment: string;
}

//TODO: make openingImage similar to twitter, as a modal
const TweetImage = ({ attachment }: TweetImageProps) => {
    return (
        <a target="_blank" href={attachment}>
            <Image
                src={attachment}
                alt={`attachment image from ${attachment}. if you are seeing this, we are unable to retrieve the image :(`}
                className="object-contain border rounded-3xl text-xs"
                width={200}
                height={200}
            />
        </a>
    );
};

export default TweetImage;
