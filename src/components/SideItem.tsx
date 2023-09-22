import React from "react";
import useNavigation from "~/navigation";
import { AnyRoute, ContentComponent } from "~/types";

interface SideItemProps {
    icon: ContentComponent;
    route: AnyRoute<string>;
    title?: string;
}

//hooks for when selected
const SideItem = ({ icon, route, title }: SideItemProps) => {
    const navigator = useNavigation();
    const navigateToPage = (route: AnyRoute<string>) => {
        navigator.replace(route);
    };

    return (
        <div className="flex gap-2 hover:translate-x-2 transition cursor-pointer" onClick={() => navigateToPage(route)}>
            <div className="flex justify-center items-center">{icon}</div>
            <div className="flex justify-center items-center text-2xl font-semibold">{title}</div>
        </div>
    );
};

export default SideItem;
