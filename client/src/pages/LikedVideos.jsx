import React, { useEffect } from 'react'
import { Container, NoVideosFound, VideoList } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import HomeSkeleton from '../skeleton/HomeSkeleton'
import { getLikedVideos } from '../store/slices/likeSlice'


const LikedVideos = () => {
  const dispatch = useDispatch()
  const LikedVideos = useSelector((state) => state.like?.likedVideos)
  const loading = useSelector((state) => state.like?.loading)
  window.scrollTo(0, 0)

  useEffect(() => {
    dispatch(getLikedVideos())
  }, [dispatch])

  if (loading) {
    return <HomeSkeleton />
  }

  if (LikedVideos?.length == 0) {
    return <NoVideosFound />
  }

  return (
    <Container>
      <div className=' text-white pt-[70px] sm:pt-[75px] mb-16 sm:m-0 w-full h-screen overflow-y-scroll '>
        <div className='w-full h-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 '>
          {LikedVideos?.map(video => (
            <VideoList
              key={video.likedVideo?._id}
              thumbnail={video.likedVideo.thumbnail?.url}
              title={video.likedVideo?.title}
              duration={video.likedVideo?.duration}
              views={video.likedVideo?.views}
              avatar={video.likedVideo?.ownerDetails?.avatar?.url}
              createdAt={video.likedVideo?.createdAt}
              videoId={video.likedVideo?._id}
              channelName={video.likedVideo?.ownerDetails?.username}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default LikedVideos
