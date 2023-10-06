import React from "react";
import Icon from "../Icon";
import { FaRegImage } from "react-icons/fa6";
import getLocals from "~/utils/getLocals";

const UploadImage = () => {
    const { COLOR_PRIMARY } = getLocals("colors");
    return (
        <div className="flex justify-center items-center">
            <label htmlFor="upload-image">
                <Icon key={"addfile"} onClick={() => {}} className="cursor-pointer">
                    <FaRegImage className={`text-${COLOR_PRIMARY} scale-y-125`} />
                </Icon>
            </label>
            <input id="upload-image" type="file" className="w-0 h-0" accept="image/*" />
        </div>
    );
};

export default UploadImage;
