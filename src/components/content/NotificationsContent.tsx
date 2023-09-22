import React from "react";
import useUser from "~/hooks/useUser";

const NotificationsContent = () => {
    const user = useUser();

    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">Notifications</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default NotificationsContent;
