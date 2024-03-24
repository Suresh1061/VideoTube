import React from 'react'
import { useSelector } from 'react-redux'
import {ChannelHeader,ChannelNavigate, Spinner} from '../components'
import { Outlet } from 'react-router-dom'

function EditChannel() {
    const channel = useSelector((state) => state.auth?.userData)
    const loading = useSelector((state) => state.auth?.loading)
    return (
        <div>
            {loading && (
                <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-start bg-black bg-opacity-75 z-50' >
                    <div className=' mt-20 flex justify-center items-center gap-2 p-4 bg-black border border-gray-600 rounded-md'>
                        <Spinner />
                        <p className=' text-lg'>Please wait....</p>
                    </div>
                </div>
            )}

            {channel && (
                <ChannelHeader
                    coverImage={channel?.coverImage?.url}
                    fullName={channel?.fullName}
                    username={channel?.username}
                    avatar={channel?.avatar?.url}
                    subscribersCount={channel?.subscribersCount}
                    channelsSubscribedToCount={channel?.channelsSubscribedToCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                    edit={true}
                />
            )
            }
            <ChannelNavigate
                username={channel?.username}
                edit={true}
            />
            <div className=' overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0'>
                <Outlet />
            </div>
        </div >

    )
}

export default EditChannel