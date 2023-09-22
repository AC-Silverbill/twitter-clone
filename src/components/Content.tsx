import React from "react";
import { BasicComponentWithChildren, ContentComponent } from "~/types";

import Sidebar from "./Sidebar";
import ContentHeader from "./ContentHeader";

interface ContentProps extends BasicComponentWithChildren {
    content: ContentComponent;
}

const Content = ({ children }: BasicComponentWithChildren) => {
    return (
        <div className="">
            <Sidebar />
            {/**TODO: fix bandaid fix on sticky position */}
            <div className="ml-[300px]">
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    );
};

export default Content;
