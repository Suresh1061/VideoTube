import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserChannel } from '../../store/slices/userSlice'
import {ChannelHeader, ChannelNavigate} from '../../components'
import { Outlet, useParams } from 'react-router-dom'

function Channel() {
    const dispatch = useDispatch()
    const { username } = useParams()
    const channel = useSelector(state => state.user?.profileDetails)

    useEffect(() => {
        dispatch(UserChannel(username))
    }, [dispatch])
    return (
        <div>
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
                />
            )}
            <ChannelNavigate username={username} />
            <div className=' overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0'>
                <Outlet />
            </div>
        </div>

    )
}

export default Channel