import React from "react";
import getLocals from "~/utils/getLocals";

import { CircularProgressbar } from "react-circular-progressbar";

interface CircleProgressBarProps {
    value: number;
    isWarning: boolean;
    isExceeded: boolean;
    text: string;
}

const CircleProgressBar = ({ value, isWarning, isExceeded, text }: CircleProgressBarProps) => {
    const { COLOR_PRIMARY, COLOR_ERROR, COLOR_WARNING } = getLocals("colors");
    return (
        <div className="flex justify-center items-center">
            <CircularProgressbar
                minValue={0}
                maxValue={100}
                value={value}
                className="w-6 h-6"
                strokeWidth={10}
                styles={{
                    text: { fontSize: 40, color: "#f88", textAnchor: "middle", alignmentBaseline: "middle" },
                    path: { stroke: `${!isWarning ? COLOR_PRIMARY : isExceeded ? COLOR_ERROR : COLOR_WARNING}` },
                    trail: { stroke: "#d6d6d6" },
                    background: { fill: "#3e98c7" },
                }}
                text={text}
            />
        </div>
    );
};

export default CircleProgressBar;
