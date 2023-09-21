import React from "react";
import { BasicComponentWithChildren, ContentComponent } from "~/types";
import Sidebar from "./Sidebar";

interface ContentProps extends BasicComponentWithChildren {
    content: ContentComponent;
}

const Content = ({ children }: BasicComponentWithChildren) => {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    );
};

export default Content;
