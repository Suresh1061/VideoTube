import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWatchHistory } from '../store/slices/userSlice'
import { VideoList, NoVideosFound, Container } from '../components'
import HomeSkeleton from '../skeleton/HomeSkeleton'

function WatchHistory() {
  const dispatch = useDispatch()
  const userHistory = useSelector((state) => state.user?.history)
  const loading = useSelector((state) => state.user?.loading)

  useEffect(() => {
    dispatch(getUserWatchHistory())
  }, [dispatch])

  if (loading) {
    return <HomeSkeleton />
  }

  if (userHistory?.length == 0) {
    return <NoVideosFound />
  }

  return (
    <Container>
      <div className=' text-white pt-[70px] sm:pt-[75px] mb-16 sm:m-0 w-full h-screen overflow-y-scroll '>
        <div className='w-full h-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 '>
          {userHistory?.map(history => (
            <VideoList
              key={history?._id}
              thumbnail={history?.thumbnail?.url}
              title={history?.title}
              duration={history?.duration}
              views={history?.views}
              avatar={history?.ownerDetails?.avatar?.url}
              createdAt={history?.createdAt}
              videoId={history?._id}
              channelName={history?.ownerDetails?.username}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default WatchHistory