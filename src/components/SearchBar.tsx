"use client";

import React, { useEffect, useRef, useState } from "react";
import getLocal from "~/utils/getLocal";
import { api } from "~/utils/api";
import useDebounce from "~/hooks/useDebounce";

import SearchBarUser from "./SearchBarUser";
import { BsSearch } from "react-icons/bs";
import useUser from "~/hooks/useUser";
const SearchBar = () => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(value, 1000);
    const secondaryColor = getLocal("colors", "COLOR_BORDER");
    const inputRef = useRef<HTMLInputElement>(null);
    const { twitterProfile } = useUser();
    useEffect(() => setSearchValue(debouncedValue), [debouncedValue]);

    const setFocus = (e: any) => {
        inputRef.current?.focus();
        setIsFocused(true);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
    };

    return <></>;
    return (
        <div className="p-2 sticky top-0">
            <div
                className={`group flex items-center bg-${secondaryColor} rounded-2xl p-2 focus-within:bg-white focus:translate-x-2 border-2 border-transparent focus-within:border-black`}
                onClick={setFocus}
                onBlur={handleBlur}
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
            {isFocused && searchValue.length !== 0 && (
                <div className="z-10 rounded-2xl border">
                    <div className="border-b-[1px] py-4 p-2 font-light">
                        <h3>{`Searching for "${searchValue}"`}</h3>
                    </div>
                    <SearchBarUser profile={twitterProfile} />
                    <SearchBarUser profile={twitterProfile} />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
