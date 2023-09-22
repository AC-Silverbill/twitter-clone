import React from "react";
import useUser from "~/hooks/useUser";
import { TwitterUser } from "~/types";

const BookmarksContent = () => {
    const user = useUser();

    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">Bookmarks</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default BookmarksContent;
