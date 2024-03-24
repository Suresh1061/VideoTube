import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Playlist, CreatePlaylist } from '../../components'
import { findPlaylistByUserId } from '../../store/slices/playlistSlice'

function ChannelPlaylist() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.playlist?.loading)
  const playlists = useSelector((state) => state.playlist?.playlist)
  const userId = useSelector((state) => state.user?.profileDetails?._id)

  const [popUp, setPopUp] = useState({
    create: false,
    update: false,
    delete: false
  })

  useEffect(() => {
    dispatch(findPlaylistByUserId(userId))
  }, [dispatch, userId, popUp])

  return (
    <div className=' py-3'>
      <div className=' w-full flex flex-col justify-center items-center'>
        <Button
          className="px-4 py-2 rounded-lg"
          onClick={() => setPopUp((prevState) => ({
            ...prevState,
            create: !prevState.create
          }))}
        >Create Playlist
        </Button>
        {playlists.length === 0 && (
          <p className=' text-center mt-20'>No playlist create</p>
        )}
      </div>
      {popUp.create && (
        <CreatePlaylist
          setPopUp={setPopUp}
        />
      )}

      {playlists && (
        <div className=' grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-6 gap-6'>
          {playlists.map((playlist) => (
            <Playlist
              title={playlist?.name}
              description={playlist?.description}
              createdAt={playlist?.updatedAt}
              totalVideos={playlist?.totalVideos}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ChannelPlaylist