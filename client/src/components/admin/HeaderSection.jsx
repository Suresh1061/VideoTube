import React from 'react'
import {
    MdOutlineSlowMotionVideo,
    RxAvatar,
    FaRegEye,
    FaRegHeart
} from "../icons";
import { Button } from '..';

function HeaderSection({ username, channelStats, setUploadVideoPopUp }) {
    return (
        <div>
            <section className=' py-4 flex justify-between items-center'>
                <div>
                    <h1 className=' text-2xl font-bold capitalize'>Welcome back, {username}</h1>
                    <p className=' text-sm text-slate-500'>Seamless Video Management, Elevated Results.</p>
                </div>
                <Button
                    textColor='text-black'
                    className={"px-3 py-2 rounded-lg hover:scale-105"}
                    onClick={() => {
                        setUploadVideoPopUp((prev) => ({
                            ...prev,
                            uploadVideo: true
                        }))
                    }}
                >Upload Video</Button>
            </section>

            <section className=' grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2'>
                <div className=' border border-slate-500 sm:p-3 p-2 rounded-md'>
                    <MdOutlineSlowMotionVideo
                        className="text-purple-500 mb-2"
                        size={30}
                    />
                    <p>Total Videos</p>
                    <span className="font-bold text-2xl">
                        {channelStats?.totalVideos}
                    </span>
                </div>
                <div className=' border border-slate-500 sm:p-3 p-2 rounded-md'>
                    <FaRegEye
                        className="text-purple-500 mb-2"
                        size={30}
                    />
                    <p>Total Views</p>
                    <span className="font-bold text-2xl">
                        {channelStats?.totalViews}
                    </span>
                </div>
                <div className=' border border-gray-600 sm:p-3 p-2 rounded-md'>
                    <RxAvatar
                        className="text-purple-500 mb-2"
                        size={30}
                    />
                    <p>Total Subscribers</p>
                    <span className="font-bold text-2xl">
                        {channelStats?.totalSubscriber}
                    </span>
                </div>
                <div className=' border border-gray-600 sm:p-3 p-2 rounded-md'>
                    <FaRegHeart
                        className="text-purple-500 mb-2"
                        size={30}
                    />
                    <p>Total Likes</p>
                    <span className="font-bold text-2xl">
                        {channelStats?.totalLikes}
                    </span>
                </div>
            </section>
        </div>
    )
}

export default HeaderSection