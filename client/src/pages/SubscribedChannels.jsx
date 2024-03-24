import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribedChannel } from '../store/slices/subscriptionSlice'
import { useNavigate } from 'react-router-dom'
import { VideoList } from '../components'

const SubscribedChannels = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const subscriberId = useSelector((state) => state.auth?.userData?._id)
  const mySubscription = useSelector((state) => state.subscription?.subscribedChannels)

  useEffect(() => {
    if (subscriberId) {
      dispatch(getSubscribedChannel(subscriberId))
    }
  }, [dispatch, subscriberId])

  return (
    <div className=' mt-[70px]'>
      <div className=' w-full p-2 bg-[#212121] flex items-center gap-2 text-white'>
        {mySubscription.map((subscription) => (
          <div
            className=' flex flex-col items-center overflow-x-scroll gap-1 cursor-pointer'
            key={subscription?.subscribedChannel?._id}
            onClick={() => navigate(`/channel/${subscription?.subscribedChannel?.username}`)}
          >
            <img src={subscription?.subscribedChannel?.avatar?.url} alt="" className=' h-10 w-10 rounded-full ' />
            <p className=' text-xs'>{subscription?.subscribedChannel?.username}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
        {mySubscription?.map((subscription) => (
          <VideoList
            key={subscription?.subscribedChannel?._id}
            avatar={subscription?.subscribedChannel?.avatar?.url}
            duration={subscription?.subscribedChannel?.latestVideo?.duration}
            title={subscription?.subscribedChannel?.latestVideo?.title}
            thumbnail={subscription?.subscribedChannel?.latestVideo?.thumbnail?.url}
            createdAt={subscription?.subscribedChannel?.latestVideo?.createdAt}
            views={subscription?.subscribedChannel?.latestVideo?.views}
            videoId={subscription?.subscribedChannel?.latestVideo?._id}
          />
        ))}
      </div>
    </div>
  )
}

export default SubscribedChannels
