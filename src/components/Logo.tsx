import React from "react";
import Image from "next/image";
import { BasicComponentWithChildren } from "~/types";

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}
const Logo = ({ className, width, height }: LogoProps) => {
    return <Image src="images/logo.svg" width={width ?? 50} height={height ?? 50} alt="Twitter Clone Logo" className={className} />;
};

export default Logo;
