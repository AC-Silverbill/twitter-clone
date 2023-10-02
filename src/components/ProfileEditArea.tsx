import React, { useState } from "react";
import useUser from "~/hooks/useUser";
import getLocals from "~/utils/getLocals";

const heights = {
    SHORT: "min-h-[75px] max-h-[75px]",
    MEDIUM: "min-h-[100px] max-h-[100px]",
    TALL: "min-h-[150px] max-h-[150px]",
} as const;

interface ProfileEditAreaProps {
    placeholder: string;
    value?: string;
    maxLength: number;
    height: keyof typeof heights;
}

const ProfileEditArea = ({ placeholder, value, maxLength, height }: ProfileEditAreaProps) => {
    const [textContent, setTextContent] = useState("");
    const { COLOR_PRIMARY } = getLocals("colors");

    const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextContent(e.currentTarget.value ?? "");
    };

    return (
        <div className={`group flex flex-col justify-start items-start border ${heights[height]}`}>
            <div className="w-full flex justify-between items-start">
                <div
                    className={`transition-all duration-75 p-2 pt-4 group-focus-within:pt-2 group-focus-within:text-${COLOR_PRIMARY} group-focus-within:text-xs`}
                >
                    {placeholder}
                </div>
                <div className={`text-transparent text-sm p-2 group-focus-within:text-black`}>{`${textContent.length}/${maxLength}`}</div>
            </div>

            <textarea
                onChange={handleContentChange}
                value={value}
                maxLength={maxLength}
                className="resize-none outline-none px-2 w-full"
            ></textarea>
        </div>
    );
};

export default ProfileEditArea;
