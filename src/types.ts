import React from "react";

export interface BasicComponentWithChildren {
    children: React.ReactNode;
    className?: string;
}

export type ContentComponent = React.ReactNode & {};
