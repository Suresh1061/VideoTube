import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { channelSubscribers } from '../../store/slices/subscriptionSlice'
import { Link, useNavigate } from 'react-router-dom'

function ChannelSubscribers() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const channelId = useSelector((state) => state.user?.profileDetails?._id)
  const subscribers = useSelector((state) => state.subscription?.channelSubscribers)

  useEffect(() => {
    if (channelId) dispatch(channelSubscribers(channelId))
  }, [dispatch, channelId])

  return (
    <>
      {subscribers.map((subscriber) => (
        <Link
          key={subscriber?.subscriber?._id}
          className=' w-full flex items-center  gap-3 p-2 border-b border-gray-600'>
          <div>
            <img src={subscriber.subscriber?.avatar?.url}
              alt=""
              className=' h-10 w-10 rounded-full'
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/channel/${subscriber?.subscriber?.username}`)
              }}
            />
          </div>
          <div>
            <p className=' capitalize text-base'>{subscriber?.subscriber?.username}</p>
            <p className=' text-sm text-slate-400'>{subscriber?.subscriber?.subscribersCount} Subscribers</p>
          </div>
        </Link>
      ))}
    </>
  )
}

export default ChannelSubscribers