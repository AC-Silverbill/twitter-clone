import React from "react";
import getLocals from "~/utils/getLocals";
import { UploadFileResponse } from "uploadthing/client";

import Icon from "../Icon";
import toast from "react-hot-toast";
import { FaRegImage } from "react-icons/fa6";
import { UploadButton } from "~/utils/uploadthing";

interface UploadImageProps {
    afterUploadCallback: (newFile: UploadFileResponse) => void;
}
const UploadImage = ({ afterUploadCallback }: UploadImageProps) => {
    const { COLOR_PRIMARY } = getLocals("colors");
    return (
        <div className="group p-2 flex justify-center items-center rounded-full hover:bg-#e8f5fe scale-100 cursor-pointer">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    const file = res![0]!;
                    toast.dismiss();
                    toast.success("File added successfully!");
                    afterUploadCallback(file);
                }}
                onUploadError={(error: Error) => {
                    toast.dismiss();
                    toast.success("Failed to upload image!");
                }}
                onUploadBegin={(filename: string) => {
                    toast.loading("Uploading file to database...");
                }}
                className="p-2 custom-class"
                appearance={{
                    button({ isUploading, ready }) {
                        return `flex justify-center items-center self-center bg-transparent focus-within:ring-0 focus-within:ring-offset-0`;
                    },

                    container: {
                        padding: "0px",
                        width: 20,
                        height: 20,
                        flexDirection: "row",
                        gap: "0px",
                        outline: "none",
                        border: "0px",
                    },
                }}
                content={{
                    button: <FaRegImage className={`text-${COLOR_PRIMARY} scale-y-125`} />,
                    allowedContent: <></>,
                }}
            />
        </div>
    );
};

export default UploadImage;
