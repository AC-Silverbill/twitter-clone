import React from "react";

interface SideItemProps {
    icon: string;
    title: string;
}

//hooks for when selected
const SideItem = ({ icon, title }: SideItemProps) => {
    return (
        <div className="flex gap-5">
            <div>icon</div>
            <div className="text-2xl font-bold">{title}</div>
        </div>
    );
};

export default SideItem;
