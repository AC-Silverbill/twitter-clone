import React, { useRef, useState } from "react";
import getVH_Height from "~/utils/getVH_Height";

interface MakeTweetAreaProps {
    onChange: (e: React.FormEvent<HTMLDivElement>) => void;
    onFocus: () => void;
    tweetContent: string;
    placeholder: string;
}

const MakeTweetArea = ({ onChange, onFocus, tweetContent, placeholder }: MakeTweetAreaProps) => {
    const areaRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(false);
    const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
        onChange(e);

        const viewHeight = getVH_Height(areaRef.current!.scrollHeight);
        console.log(viewHeight);
        //needs AND condiition to prevent constant rerendering. dont need useEffect here
        if (viewHeight >= 40 && overflow == false) {
            setOverflow(true);
        } else if (viewHeight <= 40 && overflow == true) {
            console.log("im false now");
            setOverflow(false);
        }
    };

    //TODO: add red span text with red bg for when text is exceeded (requires rewrite of this element because the element would be re-rendered, and the textarea would lose focus)
    return (
        <div
            ref={areaRef}
            role="textbox"
            contentEditable
            key={"textarea"}
            placeholder={placeholder}
            className={`px-2 outline-none break-all block resize-y textarea content-[attr(placeholder)] max-h-[7~0vh] cursor-text max-xl:bg-black ${
                overflow && `overflow-y-scroll`
            }`}
            onInput={handleChange}
            onFocus={onFocus}
        />
    );
};

export default MakeTweetArea;
