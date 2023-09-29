import React from "react";
import getLocals from "~/utils/getLocals";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";

import Button from "../Button";
import { api } from "~/utils/api";

interface PostMessageProps extends BasicComponentWithChildren {
    onClick: () => void;
    disabled: boolean;
}

const PostMessage = ({ onClick, children, className, disabled }: PostMessageProps) => {
    const { COLOR_PRIMARY, COLOR_PRIMARY_DISABLED } = getLocals("colors");
    return (
        <Button
            onClick={onClick}
            className={twMerge(
                `bg-${COLOR_PRIMARY} text-white px-5 rounded-3xl text-sm font-bold disabled:bg-${COLOR_PRIMARY_DISABLED} disabled:cursor-default enabled:hover:translate-x-1 transition`,
                className
            )}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default PostMessage;
