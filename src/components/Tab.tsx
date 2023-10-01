import React from "react";
import getLocal from "~/utils/getLocal";
import Button from "./Button";

interface TabProps {
    title: string;
    onClick: () => void;
    route?: string;
}

const Tab = ({ title, onClick, route }: TabProps) => {
    const highlightedColor = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED_DARKER");
    return (
        <Button
            className={`group flex-1 hover:bg-${highlightedColor} transition p-2 border-b-4 border-transparent hover:border-blue-500`}
            onClick={onClick}
        >
            <div className="flex justify-center items-center flex-wrap min-h-full">{title}</div>
        </Button>
    );
};

export default Tab;
