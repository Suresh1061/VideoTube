import { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Spinner,
  UploadVideo,
  HeaderSection,
  VideoTable,
  DeleteConfirmation,
  EditVideo
} from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getChannelStats, getChannelVideos } from '../store/slices/dashboardSlice';
import { deleteVideo } from '../store/slices/videoSlice';

const AdminDashboard = () => {
  const username = useSelector((state) => state.auth.userData?.username)
  const channelStats = useSelector((state) => state.dashboard?.channelStats)
  const channelVideos = useSelector((state) => state.dashboard.channelVideos)
  const uploaded = useSelector((state) => state.video.uploaded);
  const isPublished = useSelector((state) => state.video.isPublished)
  const deleting = useSelector((state) => state.video.loading)

  // console.log(channelStats)
  // console.log(channelVideos)

  const dispatch = useDispatch()
  const [videoDetails, setVideoDetails] = useState(null)

  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false
  })
  // console.log(popUp)


  useEffect(() => {
    dispatch(getChannelStats())
  }, [dispatch,])

  useEffect(() => {
    dispatch(getChannelVideos())
  }, [dispatch, uploaded, isPublished, deleting])

  const handelDeleteVideo = async () => {
    dispatch(deleteVideo(videoDetails?._id))
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo
    }))
  }

  window.scroll(0, 0);

  return (
    <>
      <Header
        uploadVideoPopUp={popUp}
        setUploadVideoPopUp={setPopUp}
      />
      <Container>
        <div className=' w-full pt-[70px]'>
          {popUp.uploadVideo && (
            <UploadVideo
              setUploadVideoPopUp={setPopUp}
            />
          )}

          {popUp.deleteVideo && (
            <DeleteConfirmation
              video={true}
              onCancel={() => setPopUp((prev) => ({
                ...prev,
                deleteVideo: !prev.deleteVideo
              }))}
              onDelete={handelDeleteVideo}
            />
          )}

          {deleting && (
            <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-start bg-black bg-opacity-75 z-50' >
              <div className=' mt-20 flex justify-center items-center gap-2 p-4 bg-black border border-gray-600 rounded-md'>
                <Spinner />
                <p className=' text-lg'>Deleting Video....</p>
              </div>
            </div>
          )}

          {popUp.editVideo && (
            <EditVideo
              videoId={videoDetails?._id}
              // thumbnail={videoDetails?.thumbnail.url}
              title={videoDetails?.title}
              description={videoDetails?.description}
              setEditVideoPopUp={setPopUp}
            />
          )}
          {channelStats && (
            <HeaderSection
              username={username}
              channelStats={channelStats}
              setUploadVideoPopUp={setPopUp}
            />
          )}

          <VideoTable
            channelVideos={channelVideos}
            setPopUp={setPopUp}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  )
}

export default AdminDashboard
