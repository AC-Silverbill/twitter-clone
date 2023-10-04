import React from "react";
import getLocal from "~/utils/getLocal";

import { PacmanLoader } from "react-spinners";

const LoadingFeedChild = () => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <div className="h-full w-full flex justify-center items-center">
            <PacmanLoader color={primaryColor}></PacmanLoader>
        </div>
    );
};

export default LoadingFeedChild;
