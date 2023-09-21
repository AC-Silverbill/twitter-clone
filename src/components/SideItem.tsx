import React from "react";
import { ContentComponent } from "~/types";

interface SideItemProps {
    icon: ContentComponent;
    title: string;
    route: string;
}

//hooks for when selected
const SideItem = ({ icon, title, route }: SideItemProps) => {
    return (
        <div className="flex gap-2">
            <div className="flex justify-center items-center">{icon}</div>
            <div className="flex justify-center items-center text-2xl font-semibold">{title}</div>
        </div>
    );
};

export default SideItem;
