import React from "react";

interface ProgressCircleProps {
    percentage: number;
}

const ProgressCircle = ({ percentage }: ProgressCircleProps) => {
    const circleWidth = 50;
    const strokeWidth = 15;
    const radius = 85;

    return (
        <div>
            <svg width={circleWidth} height={circleWidth}>
                <circle cx={circleWidth / 2} cy={circleWidth / 2} strokeWidth={`${strokeWidth}px`} radius={radius} />
            </svg>
        </div>
    );
};

export default ProgressCircle;
