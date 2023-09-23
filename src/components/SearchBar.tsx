import React, { useRef } from "react";
import getLocal from "~/utils/getLocal";

import { BsSearch } from "react-icons/bs";
const SearchBar = () => {
    const secondaryColor = getLocal("colors", "COLOR_BORDER");
    const inputRef = useRef<HTMLInputElement>(null);
    const setFocus = (e: any) => {
        inputRef.current?.focus();
    };

    return (
        <div className="p-2">
            <div
                className={`group flex items-center bg-[${secondaryColor}] rounded-2xl p-2 focus:bg-white focus:translate-x-2 border-2 border-transparent focus-within:border-black`}
                onClick={setFocus}
            >
                <BsSearch className="w-10" />
                <input ref={inputRef} type="text" placeholder="Search" className={`bg-transparent outline-none`} />
            </div>
        </div>
    );
};

export default SearchBar;
