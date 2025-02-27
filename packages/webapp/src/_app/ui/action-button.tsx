import React from "react";
import NextLink from "next/link";

interface Props {
    children: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: ActionButtonType;
    isSubmit?: boolean;
    disabled?: boolean;
    size?: ActionButtonSize;
    fullWidth?: boolean;
    className?: string;
}

export enum ActionButtonSize {
    S = "py-1.5 px-3 text-sm rounded",
    M = "py-1.5 px-5 font-medium rounded-md",
    L = "py-3 px-6 rounded-md text-lg",
}

export enum ActionButtonType {
    PRIMARY = "bg-blue-500 border-blue-500 text-white hover:bg-blue-600",
    DISABLED = "border-gray-400 bg-gray-300 text-gray-500",
    INDUCTION_STATUS_WAITING = "bg-gray-50 text-gray-800 hover:bg-gray-200",
    INDUCTION_STATUS_PROFILE = "bg-blue-500 border-blue-500 text-white hover:bg-blue-600",
    INDUCTION_STATUS_CEREMONY = "bg-blue-500 border-blue-500 text-white hover:bg-blue-600",
    INDUCTION_STATUS_ACTION = "bg-green-500 text-white hover:bg-green-600",
}
/**
 * ActionButton Best Practices:
 *
 * Try to use a type (ActionButtonType enum) to select colors.
 * If your type isn't there, create it. But we should have a bounded number of button types.
 * Avoid adding colors to the component below directly. Color overriding can easily break.
 * Override button size using size (ActionButtonSize).
 *
 * In this way, if we need a button, we know we can usually rely on ActionButton. And we
 * have a menu of button options to choose from.
 */
export const ActionButton = ({
    children,
    href,
    onClick,
    isSubmit,
    disabled,
    type = ActionButtonType.PRIMARY,
    size = ActionButtonSize.M,
    fullWidth,
    className = "",
}: Props) => {
    const baseClass =
        "inline-block items-center text-center border focus:outline-none dark:bg-blue-700 dark:bg-border-blue-700";
    const widthClass = fullWidth ? "w-full" : "";
    let colorClass = disabled ? ActionButtonType.DISABLED : type;
    const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";
    const buttonClass = `${baseClass} ${size} ${widthClass} ${colorClass} ${cursorClass} ${className}`;

    if (href) {
        return (
            <NextLink href={href}>
                <a className={buttonClass}>{children}</a>
            </NextLink>
        );
    }

    return (
        <button
            onClick={onClick}
            type={isSubmit ? "submit" : "button"}
            className={buttonClass}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
