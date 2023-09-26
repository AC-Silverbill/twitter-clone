import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import getLocal from "~/utils/getLocal";

interface IconProps {
    children: React.ReactElement<IconType>;
    className?: string;
    onClick?: () => void;
}

const Icon = ({ children, className, onClick }: IconProps) => {
    const whiteHighlighted = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    return (
        <div
            className={twMerge(`p-2 flex justify-center items-center rounded-full hover:bg-${whiteHighlighted} group`, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Icon;
