import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useNavigation from "~/navigation";
import getLocal from "~/utils/getLocal";

interface AttachmentProps {
    imageSource: string;
}
const Attachment = ({ imageSource }: AttachmentProps) => {
    // if
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const navigator = useNavigation();

    const handleClick = () => {
        navigator.push(imageSource);
    };

    //TODO: add logic for validator
    if (true) {
        return (
            <div className={`flex flex-col justify-center items-center border p-2 text-${primaryColor}`}>
                <span>Failed to load attachment: Invalid URL</span>
                <span>:/</span>
            </div>
        );
    } else {
        return <Image src={imageSource} alt={`image from ${imageSource}`} fill className="" onClick={handleClick} />;
    }
};

export default Attachment;
