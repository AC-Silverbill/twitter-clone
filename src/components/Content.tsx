import React from "react";
import { BasicComponentWithChildren, ContentComponent } from "~/types";
import Sidebar from "./Sidebar";

interface ContentProps extends BasicComponentWithChildren {
    content: ContentComponent;
}

const Content = ({ children }: BasicComponentWithChildren) => {
    return (
        <div className="">
            <Sidebar />
            {/**TODO: fix bandaid fix on sticky position */}
            <div className="ml-[300px]">{children}</div>
        </div>
    );
};

export default Content;
