import React from "react";
import Icon from "../Icon";
import { FaRegImage } from "react-icons/fa6";
import getLocals from "~/utils/getLocals";
import { UploadButton } from "~/utils/uploadthing";

interface UploadImageProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadImage = ({ onChange }: UploadImageProps) => {
    const { COLOR_PRIMARY } = getLocals("colors");
    return (
        <div className="group p-2 flex justify-center items-center rounded-full hover:bg-#e8f5fe scale-100 cursor-pointer">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
                className="p-2"
                appearance={{
                    button: {
                        background: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignSelf: "center",
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
            <input id="upload-image" type="file" className="w-0 h-0" accept="image/*" onChange={onChange} />
        </div>
    );
};

export default UploadImage;
