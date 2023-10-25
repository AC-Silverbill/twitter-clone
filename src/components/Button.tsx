import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import getLocals from "~/utils/getLocals";

const { COLOR_PRIMARY, COLOR_PRIMARY_HIGHLIGHTED, COLOR_WHITE_HIGHLIGHTED, COLOR_WHITE_HIGHLIGHTED_DARKER } = getLocals("colors");

const buttonTemplates = {
    WHITE_BG: `rounded-3xl font-semibold p-2 px-4 border transition text-sm text-black bg-white hover:bg-${COLOR_WHITE_HIGHLIGHTED} hover:scale-105`,
    PRIMARY_BG: `rounded-3xl font-semibold p-2 px-4 border transition text-sm text-white bg-${COLOR_PRIMARY} hover:bg-${COLOR_PRIMARY_HIGHLIGHTED} hover:scale-105`,
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonTemplate?: keyof typeof buttonTemplates;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, disabled, type = "button", buttonTemplate, ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(`${buttonTemplate ? buttonTemplates[buttonTemplate] : ""}`, className)}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
