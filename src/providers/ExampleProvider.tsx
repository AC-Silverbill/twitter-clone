import React from "react";
import { BasicComponentWithChildren } from "~/types";

interface ExampleProvider extends BasicComponentWithChildren {}

const ExampleProvider = () => {
    return <div>ExampleProvider</div>;
};

export default ExampleProvider;
