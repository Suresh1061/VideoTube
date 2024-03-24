import React from 'react'
import { timeAgo, formatDuration } from '../helpers/timeAgo'
import { useNavigate } from 'react-router-dom'

const VideoList = ({
    thumbnail,
    title,
    duration,
    views = 0,
    avatar,
    createdAt,
    videoId,
    channelName
}) => {
    const navigate = useNavigate()
    const handleAvatarClick = (e) => {
        e.stopPropagation()
        navigate(`/channel/${channelName}`)
    }

    return (
        <div
            className=' w-full sm:p-2 cursor-pointer pb-1'
            onClick={() => navigate(`/watch/${videoId}`)}
        >
            <div className="relative aspect-[5/3] ">
                <img src={thumbnail} alt="video thumbnail" className="object-cover w-full h-full sm:rounded-lg" />
                <span className="absolute bottom-2 right-2 bg-black px-2 py-1 rounded-lg text-sm text-white">
                    {formatDuration(duration)}
                </span>
            </div>

            <div className=' flex gap-3 items-center p-2 '>
                {
                    avatar && (
                        <img
                            src={avatar}
                            className=' w-10 h-10 rounded-full object-cover border border-slate-600'
                            onClick={handleAvatarClick}
                        />
                    )
                }
                <div className=' capitalize'>
                    <h2 className=' font-medium text-[17px] '>{title}</h2>
                    {channelName && (
                        <h2 className=' text-sm text-slate-400 '>
                            {channelName}
                        </h2>
                    )}
                    <div className=' text-xs space-x-1 text-slate-400'>
                        <span>{views} Views</span> .
                        <span>{timeAgo(createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoList
