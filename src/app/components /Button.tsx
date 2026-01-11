'use client'

import {ReactNode} from "react";

type ButtonProps = {
    children?: ReactNode;
    onClick: () => void;
    variant: 'primary' | 'secondary';
    disabled?: boolean;
    className?: string;
}

export default function Button(props: ButtonProps) {
    const baseStyle = "m-[1vmin] px-[4vmin] py-[2vmin] text-[clamp(1.5rem,3vmin,3rem)] rounded-xl";

    const variantStyles = {
        primary: "bg-cyan-600 text-white",
        secondary: "bg-slate-700 text-white",
    };
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`m-[1vmin] px-[4vmin] py-[2vmin] text-[clamp(1.5rem,3vmin,3rem)] rounded-xl text-[clamp(1.5rem,2vmin,3rem)]  ${baseStyle} ${variantStyles[props.variant]} ${props.className ?? ""}`}
        >
            {props.children}
        </button>
    );
}