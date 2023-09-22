import React from "react";

interface ContentTitleProps {
    title: string;
}
const ContentTitle = ({ title }: ContentTitleProps) => {
    return <h1 className="p-2 font-bold text-xl">{title}</h1>;
};

export default ContentTitle;
