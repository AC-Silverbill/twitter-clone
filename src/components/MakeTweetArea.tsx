import React from "react";

interface MakeTweetAreaProps {
    onChange: (e: React.FormEvent<HTMLDivElement>) => void;
    onFocus: () => void;
    tweetContent: string;
    placeholder: string;
}

const MakeTweetArea = ({ onChange, onFocus, tweetContent, placeholder }: MakeTweetAreaProps) => {
    const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
        onChange(e);
    };

    //TODO: add red span text with red bg for when text is exceeded (requires rewrite of this element because the element would be re-rendered, and the textarea would lose focus)
    //TODO: fix blur after max height, happens at most heights, but unblurs at certain pixels
    return (
        <span
            role="textbox"
            contentEditable
            key={"textarea"}
            placeholder={placeholder}
            className={`_line-break-anywhere px-2 outline-none resize-y textarea cursor-text content-[attr(placeholder)] max-h-[100vh] overflow-auto`}
            onInput={handleChange}
            onFocus={onFocus}
        />
    );
};

export default MakeTweetArea;
