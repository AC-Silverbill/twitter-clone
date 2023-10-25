import React from "react";
import Button from "../Button";
import { FaGlobeAmericas } from "react-icons/fa";
import getLocals from "~/utils/getLocals";

interface WhoCanReplyProps {
    onClick: () => void;
}

const WhoCanReply = ({ onClick }: WhoCanReplyProps) => {
    const { COLOR_WHITE_HIGHLIGHTED, COLOR_PRIMARY } = getLocals("colors");

    return (
        <Button
            className={`flex px-2 items-center transition hover:bg-${COLOR_WHITE_HIGHLIGHTED} self-start rounded-3xl`}
            onClick={onClick}
        >
            <FaGlobeAmericas size={10} className={`text-${COLOR_PRIMARY}`} />
            <span className={`flex text-${COLOR_PRIMARY} text-xs font-semibold self-start p-1 px-2`}>Everyone can reply</span>
        </Button>
    );
};

export default WhoCanReply;
