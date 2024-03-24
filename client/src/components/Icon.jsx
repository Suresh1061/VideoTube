import React from 'react'
import icon from "../assets/icon.png"

const Icon = ({ width }) => {
    return (
        <img src={icon} alt="" className={`${width}`} />
    )
}

export default Icon
