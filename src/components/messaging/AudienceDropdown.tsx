import React from "react";
import getLocals from "~/utils/getLocals";

import Button from "../Button";

const AudienceDropdown = () => {
    const { COLOR_WHITE_HIGHLIGHTED, COLOR_PRIMARY } = getLocals("colors");

    return (
        <div className="px-2 pb-2">
            <Button
                className={`flex border rounded-3xl transition hover:bg-${COLOR_WHITE_HIGHLIGHTED} text-${COLOR_PRIMARY} text-xs font-semibold self-start p-1 px-2`}
            >
                Everyone -
            </Button>
        </div>
    );
};

export default AudienceDropdown;
