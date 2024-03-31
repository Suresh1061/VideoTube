import React, { useState } from 'react'
import { timeAgo } from '../helpers/timeAgo';
import { Like } from "./index"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSubscription } from '../store/slices/subscriptionSlice';

function VideoDescription({
    videoId,
    title,
    views,
    createdAt,
    avatar,
    description,
    channelName,
    likesCount,
    isLiked,
    subscribersCount = 0,
    isSubscribed,
    channelId
}) {
    const [LocalIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount);
    const dispatch = useDispatch();

    const handleSubscribe = () => {
        dispatch(toggleSubscription(channelId));
        setLocalIsSubscribed((prev) => !prev);
        if (LocalIsSubscribed) {
            setLocalSubscribersCount((prev) => prev - 1);
        } else {
            setLocalSubscribersCount((prev) => prev + 1);
        }
    };

    return (
        <>
            <section className="sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2">
                <div className="border-b border-slate-700">
                    <div className="space-y-2 mb-2">
                        <div className="flex items-center justify-between pb-2">
                            <div>
                                <h1 className=" text-xl sm:text-2xl font-semibold">{title}</h1>
                                <div>
                                    <span className="text-sm text-slate-400">
                                        {views} views .{" "}
                                    </span>
                                    <span className="text-sm text-slate-400">
                                        {timeAgo(createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div className=" rounded-full flex justify-center px-4 bg-[#222222] py-2">
                                <Like
                                    isLiked={isLiked}
                                    videoId={videoId}
                                    likesCount={likesCount}
                                    size={25}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Link
                                to={`/channel/${channelName}/videos`}
                                className="flex gap-2"
                            >
                                <img
                                    src={avatar}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h1 className=" text-xl capitalize font-medium">
                                        {channelName}
                                    </h1>
                                    <p className="text-sm text-slate-400">
                                        {localSubscribersCount} Subscribers
                                    </p>
                                </div>
                            </Link>
                            <div>
                                <button
                                    onClick={handleSubscribe}
                                    className={`${!LocalIsSubscribed ? "bg-purple-600  text-black" : "bg-[#222222] text-gray-200"} transition-all px-4 py-2 font-semibold  rounded-full`}
                                >
                                    {LocalIsSubscribed
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-sm bg-[#222222] rounded-md p-2 outline-none">
                    {description}
                </p>
            </section>
        </>
    );
}

export default VideoDescription