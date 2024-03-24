import React from 'react'
import videoTube from "../assets/vt.png"
import { useNavigate } from 'react-router-dom'

const Logo = ({ width = 'w-[160px]', ...props }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate("/")}>
            <img
                src={videoTube}
                alt=""
                className={`${width} cursor-pointer`} />
        </div>
    )
}

export default Logo
