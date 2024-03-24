import React from 'react'

function Spinner({width=' w-5 h-5'}) {
    return (
        <div>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className={` ${width} border-[3px] text-violet-600 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-violet-600 rounded-full`}>
                </div>
            </div>
        </div >
    )
}

export default Spinner