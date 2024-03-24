import React, { useState } from 'react'
import {
    BiSolidLike,
    BiSolidDislike,
} from "./icons"
import { useDispatch } from 'react-redux'
import { toggleCommentLike, toggleTweetLike, toggleVideoLike } from '../store/slices/likeSlice'

function Like({ isLiked, likesCount = 0, videoId, commentId, tweetId, size }) {
    // console.log(isLiked, " ", likesCount)
    const [localIsLiked, setLocalIsLiked] = useState(isLiked)
    const [localLikesCount, setLocalLikesCount] = useState(likesCount)
    const dispatch = useDispatch()

    const handelToggleLike = () => {
        if (videoId) dispatch(toggleVideoLike(videoId))
        if (commentId) dispatch(toggleCommentLike(commentId))
        if (tweetId) dispatch(toggleTweetLike(tweetId))

        setLocalIsLiked((prev) => !prev)
        if (localIsLiked) {
            setLocalLikesCount(prev => prev - 1)
        } else {
            setLocalLikesCount(prev => prev + 1)
        }
    }

    return (
            <div className={` flex items-center gap-1 `}>
                <BiSolidLike
                    size={size}
                    onClick={handelToggleLike}
                    className={localIsLiked ? "cursor-pointer text-purple-600" : "cursor-pointer text-white"} />
                <p className=' text-sm'>{localLikesCount}</p>
                <BiSolidDislike size={size} className=' ml-2' />
            </div>
    )
}

export default Like