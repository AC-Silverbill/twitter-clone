import React from "react";
import getLocal from "~/utils/getLocal";
import Button from "./Button";

interface TabProps {
    title: string;
    handleClick: () => void;
}

const Tab = ({ title, handleClick }: TabProps) => {
    const highlightedColor = getLocal("colors", "COLOR_HIGHLIGHTED");
    return (
        <Button className={`group flex-1 hover:bg-[${highlightedColor}] transition p-2`} onClick={handleClick}>
            <div className="flex-1 h-full">
                <span>{title}</span>
            </div>
        </Button>
    );
};

export default Tab;
