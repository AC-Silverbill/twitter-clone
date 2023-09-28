import React from "react";
import getLocal from "~/utils/getLocal";

interface AddAnotherPostProps {}

const AddAnotherPost = () => {
    const COLOR_WHITE_HIGHLIGHTED = getLocal("colors", "COLOR_PRIMARY_HIGHLIGHTED");
    return (
        <button className={`flex justify-center items-center w-7 h-7 rounded-full border self-center hover:bg-${COLOR_WHITE_HIGHLIGHTED}`}>
            +
        </button>
    );
};

export default AddAnotherPost;
