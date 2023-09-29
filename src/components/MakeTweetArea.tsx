import React, { useRef } from "react";

interface MakeTweetAreaProps {
    onChange: (e: React.FormEvent<HTMLDivElement>) => void;
    onFocus: () => void;
    tweetContent: string;
    placeholder: string;
}

const MakeTweetArea = ({ onChange, onFocus, tweetContent, placeholder }: MakeTweetAreaProps) => {
    const areaRef = useRef<HTMLDivElement>(null);

    //TODO: add red span text with red bg for when text is exceeded (requires rewrite of this element because the element would be re-rendered, and the textarea would lose focus)
    return (
        <div
            ref={areaRef}
            role="textbox"
            contentEditable
            key={"textarea"}
            placeholder={placeholder}
            className={`px-2 outline-none break-all max-h-full block resize-y textarea content-[attr(placeholder)] cursor-text`}
            onInput={onChange}
            onFocus={onFocus}
        />
    );
};

export default MakeTweetArea;
