import React from "react";
import { BasicComponentWithChildren } from "~/types";

interface ExampleProviderProps extends BasicComponentWithChildren {}

const ExampleProvider = ({ children }: ExampleProviderProps) => {
    return <>{children}</>;
};

export default ExampleProvider;
