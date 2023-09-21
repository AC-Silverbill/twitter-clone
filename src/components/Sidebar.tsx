import React from "react";
import SideItem from "./SideItem";
const Sidebar = () => {
    return (
        <div className="fixed flex flex-col p-4 px-10 pb-20 border border-gray-100 h-[100vh] w-[200px] z-[1]">
            <SideItem icon="asd" title="Home" />
            <SideItem icon="asd" title="Home" />
            <SideItem icon="asd" title="Home" />
            <SideItem icon="asd" title="Home" />
        </div>
    );
};

export default Sidebar;
