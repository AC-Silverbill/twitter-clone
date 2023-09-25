import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";

interface BoxProps extends BasicComponentWithChildren {}

const Box = ({ children, className }: BoxProps) => {
    return <div className={twMerge("h-fit w-full", className)}>{children}</div>;
};

export default Box;
