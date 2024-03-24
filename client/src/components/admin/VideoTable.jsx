import React from 'react'
import {
    ImBin,
    GrEdit
} from "../icons";
import ToggleIsPublished from '../ToggleIsPublished';

function VideoTable({ channelVideos, setPopUp, setVideoDetails }) {
    return (
        <div>
            <section className="mx-auto my-4 w-full overflow-x-scroll">
                <table className="min-w-full border border-slate-500">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-slate-500">Toggle Publish</th>
                            <th className="py-2 px-4 border-b border-slate-500">Status</th>
                            <th className="py-2 px-4 border-b border-slate-500">Title</th>
                            <th className="py-2 px-4 border-b border-slate-500">Rating</th>
                            <th className="py-2 px-4 border-b border-slate-500">Date Uploaded</th>
                            <th className="py-2 px-4 border-b border-slate-500"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            channelVideos.map(video => (
                                <tr className=' border-b border-slate-500' key={video._id}>
                                    <th className="py-3 ">
                                        <span className=' flex justify-center items-center'>
                                            <ToggleIsPublished
                                                isPublished={video?.isPublished}
                                                videoId={video?._id}
                                            />
                                        </span>
                                    </th>
                                    <th className="py-3 ">
                                        {
                                            video?.isPublished ? (
                                                <span className=' px-3 py-1 rounded-full  border border-green-500 text-green-500'>Published</span>
                                            ) :
                                                (
                                                    <span className=' px-3 py-1 rounded-full  border border-red-500 text-red-500'>Unpublished</span>
                                                )
                                        }
                                    </th>
                                    <th className="py-3 capitalize ">{video?.title}</th>
                                    <th className="py-3">
                                        <span className=' px-2 py-1 text-blue-500 border border-blue-600 rounded-lg '>
                                            {video?.likesCount} Likes
                                        </span>
                                    </th>
                                    <th className="py-3">
                                        {video?.createdAt.day}/
                                        {video?.createdAt.month}/
                                        {video?.createdAt.year}
                                    </th>
                                    <th className='py-3'>
                                        <span className=' flex justify-center items-center gap-2'>
                                            <ImBin
                                                size={18}
                                                className=' hover:text-red-500 cursor-pointer'
                                                onClick={() => {
                                                    setPopUp((prev) => ({
                                                        ...prev,
                                                        deleteVideo: !prev.deleteVideo
                                                    }))
                                                    setVideoDetails(video)
                                                }}
                                            />
                                            <GrEdit
                                                size={18}
                                                className=' hover:text-violet-500 cursor-pointer'
                                                onClick={() => {
                                                    setPopUp((prev) => ({
                                                        ...prev,
                                                        editVideo: !prev.editVideo
                                                    }))
                                                    setVideoDetails(video)
                                                }}
                                            />
                                        </span>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default VideoTable