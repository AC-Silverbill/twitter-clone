"use client";

import React, { useRef, useState } from "react";
import getLocal from "~/utils/getLocal";

import { BsSearch } from "react-icons/bs";
const SearchBar = () => {
    const [value, setValue] = useState("");
    const secondaryColor = getLocal("colors", "COLOR_BORDER");
    const inputRef = useRef<HTMLInputElement>(null);
    const setFocus = (e: any) => {
        inputRef.current?.focus();
    };

    return (
        <div className="p-2">
            <div
                className={`group flex items-center bg-[${secondaryColor}] rounded-2xl p-2 focus-within:bg-white focus:translate-x-2 border-2 border-transparent focus-within:border-black`}
                onClick={setFocus}
            >
                <BsSearch className="w-10" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    className={`bg-transparent outline-none`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
