import React from "react";

interface ContentTitleProps {
    title: string;
}
const ContentTitle = ({ title }: ContentTitleProps) => {
    return (
        <div className="p-2 font-bold text-xl">
            <title className="p-2">{title}</title>
        </div>
    );
};

export default ContentTitle;
