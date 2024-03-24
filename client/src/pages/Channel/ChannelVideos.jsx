import React, { useEffect, useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideos, makeVideosNull } from '../../store/slices/videoSlice'
import { NoVideosFound, VideoList } from '../../components'

function ChannelVideos() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state.video?.videos?.docs)
    const userId = useSelector((state) => state.user?.profileDetails?._id)
    const [searchParams, setSearchParams] = useState()
    const [activeButton, setActiveButton] = useState("button1")

    useEffect(() => {
        const sortBy = searchParams?.sortBy
        const sortType = searchParams?.sortType
        dispatch(getAllVideos({ userId, sortBy, sortType }))

        return () => makeVideosNull()
    }, [dispatch, useId, searchParams])

    if (videos.length == 0) {
        return <NoVideosFound />
    }

    const handleSort = (sortBy, sortType = 'asc') => {
        setSearchParams({ sortBy, sortType })
        console.log(searchParams);
    }

    return (
        <>
            {/* For sorting latest, popular and oldest videos */}
            <div className="w-full p-2 text-white flex gap-4">
                <button
                    onClick={() => {
                        setActiveButton("button1");
                        handleSort("createdAt", "desc");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "button1"
                        ? "bg-purple-500"
                        : "bg-[#222222]"
                        }`}
                >
                    Latest
                </button>
                <button
                    onClick={() => {
                        setActiveButton("button2");
                        handleSort("views", "desc");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "button2"
                        ? "bg-purple-500"
                        : "bg-[#222222]"
                        }`}
                >
                    Popluar
                </button>
                <button
                    onClick={() => {
                        setActiveButton("button3");
                        handleSort("createdAt", "asc");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "button3"
                        ? "bg-purple-500"
                        : "bg-[#222222]"
                        }`}
                >
                    Oldest
                </button>
            </div>
            {/* Video listing */}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
                {videos?.map((video) => (
                    <VideoList
                        key={video._id}
                        avatar={video.avatar?.url}
                        duration={video.duration}
                        title={video.title}
                        thumbnail={video.thumbnail?.url}
                        createdAt={video.createdAt}
                        views={video.views}
                        videoId={video._id}
                    />
                ))}
            </div>
        </>
    );
}

export default ChannelVideos