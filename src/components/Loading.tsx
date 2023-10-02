import React, { useEffect } from "react";
import getLocal from "~/utils/getLocal";

import { PacmanLoader } from "react-spinners";
import Content from "./Content";

const Loading = () => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <Content>
            <div className="h-full w-full flex justify-center items-center">
                <PacmanLoader color={primaryColor}></PacmanLoader>
            </div>
        </Content>
    );
};

export default Loading;
