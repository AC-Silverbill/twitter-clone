import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";

interface StickyHeaderProps extends BasicComponentWithChildren {}

const StickyHeader = ({ children, className }: StickyHeaderProps) => {
    return (
        <div
            id="heading"
            className={twMerge(`border-b-[1px] border-[#000000] sticky bg-[rbga(255,255,255,1)] top-0 z-10 backdrop-blur-[6px]`, className)}
        >
            {children}
        </div>
    );
};

export default StickyHeader;
