import React from "react";

interface ContentTitleProps {
    title: string;
}
const ContentTitle = ({ title }: ContentTitleProps) => {
    return (
        <div className="p-2 font-bold text-xl">
            <h1 className="p-2">{title}</h1>
        </div>
    );
};

export default ContentTitle;
