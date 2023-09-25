import React from "react";
import { BasicComponentWithChildren } from "~/types";

interface MakeTweetProps extends BasicComponentWithChildren {}

const MakeTweet = ({}: MakeTweetProps) => {
    return (
        <div className="">
            <div></div>
        </div>
    );
};

export default MakeTweet;
