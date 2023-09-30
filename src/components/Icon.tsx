import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import getLocal from "~/utils/getLocal";

interface IconProps {
    children: React.ReactElement<IconType>;
    className?: string;
    onClick?: () => void;
    scale?: "scale-100" | "scale-125" | "scale-150";
}

const Icon = ({ children, className, onClick, scale = "scale-100" }: IconProps) => {
    const whiteHighlighted = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    return (
        <div
            className={twMerge(`group p-2 flex justify-center items-center rounded-full hover:bg-${whiteHighlighted} ${scale}`, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Icon;
