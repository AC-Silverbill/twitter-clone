import React, { useRef } from "react";

interface MakeTweetAreaProps {
    onChange: (e: React.FormEvent<HTMLDivElement>) => void;
    onFocus: () => void;
    value: string;
}

const MakeTweetArea = ({ onChange, onFocus }: MakeTweetAreaProps) => {
    return (
        <div
            role="textbox"
            contentEditable
            key={"textarea"}
            placeholder="What is happening?!"
            className={`px-2 outline-none break-all max-h-full block resize-y textarea content-[attr(placeholder)] cursor-text`}
            onInput={onChange}
            onFocus={onFocus}
        />
    );
};

export default MakeTweetArea;
