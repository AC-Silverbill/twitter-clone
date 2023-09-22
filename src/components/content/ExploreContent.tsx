import React from "react";
import useUser from "~/hooks/useUser";

import Tab from "../Tab";
import ContentTitle from "../ContentTitle";

const ExploreContent = () => {
    const user = useUser();

    return (
        <>
            <div id="content" className="flex-[3] flex flex-col">
                <div id="heading" className="border-b-[1px] border-[#000000]">
                    <ContentTitle title="Explore" />
                    <div className="flex">
                        <Tab title="For you" handleClick={() => {}} />
                        <Tab title="Trending" handleClick={() => {}} />
                        <Tab title="News" handleClick={() => {}} />
                        <Tab title="Sports" handleClick={() => {}} />
                        <Tab title="Entertainment" handleClick={() => {}} />
                    </div>
                </div>
                <div className="h-[100vh]">asdasd</div>
                <div className="h-[100vh]">asdasd</div>
            </div>
            <div id="discovery"></div>
        </>
    );
};

export default ExploreContent;
