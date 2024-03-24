import React from 'react'

const Button = ({
    children,
    type = 'button',
    textColor = "text-white",
    className,
    bgColor = 'bg-violet-500',
    ...props
}) => {
    return (
        <button
            type={type}
            {...props}
            className={`${textColor} ${bgColor}  ${className} duration-200 ease-in`}
        >
            {children}
        </button>
    )
}

export default Button
