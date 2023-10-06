import React from "react";
import Icon from "../Icon";
import { FaRegImage } from "react-icons/fa6";
import getLocals from "~/utils/getLocals";

interface UploadImageProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadImage = ({ onChange }: UploadImageProps) => {
    const { COLOR_PRIMARY } = getLocals("colors");
    return (
        <div className="flex justify-center items-center">
            <label htmlFor="upload-image">
                <Icon key={"addfile"} className="cursor-pointer">
                    <FaRegImage className={`text-${COLOR_PRIMARY} scale-y-125`} />
                </Icon>
            </label>
            <input id="upload-image" type="file" className="w-0 h-0" accept="image/*" onChange={onChange} />
        </div>
    );
};

export default UploadImage;
