import React, { forwardRef, useId } from 'react'

const Input = ({
    type = 'text',
    label,
    placeholder,
    className = '',
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className=' w-full'>
            {label && <label
                htmlFor={id}
                className=' inline-block mb-1 pl-1 font-medium'
            >{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                ref={ref}
                {...props}
                className={` px-3 py-2 bg-[#121212] text-white border border-gray-600  outline-none  duration-200 focus:bg-[#212121] w-full ${className}`}
            />
        </div>
    )
}

export default forwardRef(Input)