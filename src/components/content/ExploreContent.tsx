import React from "react";
import useUser from "~/hooks/useUser";

const ExploreContent = () => {
    const user = useUser();

    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">Explore</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default ExploreContent;
