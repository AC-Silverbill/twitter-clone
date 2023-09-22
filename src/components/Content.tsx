import React from "react";
import { BasicComponentWithChildren, ContentComponent } from "~/types";

import Sidebar from "./Sidebar";
import ContentHeader from "./ContentHeader";
import Discovery from "./Discovery";

interface ContentProps extends BasicComponentWithChildren {
    content: ContentComponent;
}

const Content = ({ children }: BasicComponentWithChildren) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-[300px] flex w-[990px]">
                {/**TODO: fix bandaid fix on sticky position */}
                <div className="flex-[3]">{children}</div>
                <Discovery />
            </div>
        </div>
    );
};

export default Content;
