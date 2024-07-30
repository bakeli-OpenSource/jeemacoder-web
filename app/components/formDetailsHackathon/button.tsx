import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react'

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    variant?: "default" | "rounded";
    className?: string;
}

export const Button = ({ className, variant = "default", ...props }: ButtonProps) => {
    return (
        <button className={clsx({
            "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-orange-400 transition duration-300 ease-in-out": variant === "default",
            "px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out": variant === "rounded"
        }, className)} 
        {...props}
        >
            {props.children}
        </button>
    )
}
