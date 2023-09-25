"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { BasicComponentWithChildren } from "~/types";
import { twMerge } from "tailwind-merge";

import Button from "./Button";

interface SignoutProps {
    className?: string;
}

const Signout = ({ className }: SignoutProps) => {
    return (
        <Button onClick={() => signOut()} className={twMerge(`p-2 border-2 hover:bg-gray-400 transition rounded-3xl`, className)}>
            Signout
        </Button>
    );
};

export default Signout;
