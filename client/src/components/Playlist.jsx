import React from 'react'
import { timeAgo } from "../helpers/timeAgo"
import { CgPlayList } from "react-icons/cg";

function Playlist({ title, description, createdAt, totalVideos }) {
    return (
        <div className=' max-w-xs border flex flex-col border-slate-600 rounded-lg overflow-hidden'>
            <div className=' h-44 relative'>
                <div className=' absolute bottom-2 right-2 z-30 bg-black rounded-md px-2 py-1 flex  items-center gap-1 text-sm '>
                    <CgPlayList size={18} />
                    <span>{totalVideos}</span>
                </div>
            </div>
            <div className=' border-t border-slate-600 bg-[#212121] px-3 py-1'>
                <div>
                    <p className=' capitalize text-lg font-semibold'>{title}</p>
                    {/* <p className=' text-sm text-slate-300'>{description}</p> */}
                    <span className=' text-xs text-slate-400'>{timeAgo(createdAt)}{" . "}</span>
                    <span className=' text-xs text-slate-400'>Playlist</span>
                </div>
                
            </div>
        </div>
    )
}

export default Playlist