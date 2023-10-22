"use client";

import React, { useEffect, useRef, useState } from "react";
import getLocals from "~/utils/getLocals";
import { api } from "~/utils/api";
import useDebounce from "~/hooks/useDebounce";

import SearchBarUser from "./SearchBarUser";
import { BsSearch } from "react-icons/bs";
import useUser from "~/hooks/useUser";
import { Profile } from "~/types";
const SearchBar = () => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(value, 1000);
    const { COLOR_SECONDARY, COLOR_BORDER } = getLocals("colors");
    const inputRef = useRef<HTMLInputElement>(null);
    const { twitterProfile } = useUser();
    const searchTRPC = api.user.searchUsers.useQuery({ username: debouncedValue });
    const GROUP_CLASSNAME = "searchbar-group";
    let searchResults: Profile[] = [];
    if (debouncedValue.length !== 0) {
        searchResults = searchTRPC.data || [];
    } else {
        //do nothing
    }

    useEffect(() => {
        setSearchValue(debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {}, []);

    const setFocus = (e: any) => {
        inputRef.current?.focus();
        setIsFocused(true);
    };

    const isPartOfGroup = (target: EventTarget & Element): boolean => {
        console.log("test", target.closest(GROUP_CLASSNAME));
        return !!target.closest(`.${GROUP_CLASSNAME}`);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        if (!e.relatedTarget) {
            setIsFocused(false);
            return;
        }

        if (isPartOfGroup(e.relatedTarget)) {
            //do nothing
        } else {
            setIsFocused(false);
        }
    };

    return (
        <div className="p-2 sticky top-0" onBlur={handleBlur}>
            <div
                className={`group flex items-center bg-${COLOR_BORDER} rounded-2xl p-2 focus-within:bg-white focus:translate-x-2 border-2 border-transparent focus-within:border-black caret-transparent`}
                onClick={setFocus}
            >
                <BsSearch className="w-10" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    className={`bg-transparent outline-none ${isFocused ? "caret-black" : ""}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="p-4">child div</div>
            {isFocused && searchValue.length !== 0 && (
                <div className="rounded-2xl border" onClick={setFocus}>
                    <div className={`flex justify-center align-center border-b-[1px] py-4 p-2 text-${COLOR_SECONDARY}`}>
                        <h3>{`Searching for "${searchValue}"`}</h3>
                    </div>
                    {searchResults.map((profile) => (
                        <SearchBarUser profile={profile} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
