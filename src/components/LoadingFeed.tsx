import React from "react";
import getLocal from "~/utils/getLocal";

import { PacmanLoader } from "react-spinners";
import Content from "./Content";

const LoadingFeed = () => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <Content>
            <div className="h-full w-full flex justify-center items-center pt-4">
                <PacmanLoader color={primaryColor}></PacmanLoader>
            </div>
        </Content>
    );
};

export default LoadingFeed;
