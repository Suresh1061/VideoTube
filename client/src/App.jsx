import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { getCurrentUser } from './store/slices/authSlice.js'
import {
  AuthLayout,
  Login,
  Signup,
  SearchVideos,
  EditPersonalInfo,
  UpdatePassword,
} from './components'
import Layout from './Layout.jsx'
import {
  Channel,
  ChannelPlaylist,
  ChannelSubscribers,
  ChannelTweets,
  ChannelVideos,
  AdminDashboard,
  EditChannel,
  Home,
  LikedVideos,
  SubscribedChannels,
  TermsAndConditions,
  VideoDetails,
  WatchHistory,
} from "./pages"


axios.defaults.withCredentials = true

const App = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth?.token)

  useEffect(() => {
    dispatch(getCurrentUser(accessToken))
  }, [dispatch])

  // console.log(accessToken)
  // const currUser = async () => {

  //   const res = await axios.get("http://localhost:3000/api/v1/users/current-user")
  //   // const res = await axios.get("http://localhost:3000/api/v1/users/current-user")
  //   console.log(res)
  // }

  // useEffect(() => {
  //   currUser()
  // }, [])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            path=''
            element={
              <AuthLayout authentication={false}>
                <Home />
              </AuthLayout>
            }
          />
          <Route
            path='/search/:query'
            element={
              <AuthLayout authentication={false}>
                <SearchVideos />
              </AuthLayout>
            }
          />
          <Route
            path='/channel/:username'
            element={
              <AuthLayout authentication>
                <Channel />
              </AuthLayout>
            }
          >
            <Route
              path='videos'
              element={
                <AuthLayout authentication>
                  <ChannelVideos />
                </AuthLayout>
              }
            />
            <Route
              path='playlists'
              element={
                <AuthLayout authentication>
                  <ChannelPlaylist />
                </AuthLayout>
              }
            />
            <Route
              path='tweets'
              element={
                <AuthLayout authentication>
                  <ChannelTweets />
                </AuthLayout>
              }
            />
            <Route
              path='subscribers'
              element={
                <AuthLayout authentication>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
          </Route>
          <Route
            path='/liked-videos'
            element={
              <AuthLayout authentication>
                <LikedVideos />
              </AuthLayout>
            }
          />
          <Route
            path='/history'
            element={
              <AuthLayout authentication>
                <WatchHistory />
              </AuthLayout>
            }
          />
          <Route
            path='/subscriptions'
            element={
              <AuthLayout authentication>
                <SubscribedChannels />
              </AuthLayout>
            }
          />
          <Route
            path='/edit'
            element={
              <AuthLayout authentication>
                <EditChannel />
              </AuthLayout>
            }
          >
            <Route
              path="personalInfo"
              element={
                <AuthLayout authentication>
                  <EditPersonalInfo />
                </AuthLayout>
              }
            />
            <Route
              path="password"
              element={
                <AuthLayout authentication>
                  <UpdatePassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>
        <Route
          path='/login'
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path='/signup'
          element={
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path='/collections'
          element={
            <AuthLayout authentication>
              <AdminDashboard />
            </AuthLayout>
          }
        />
        <Route
          path='/watch/:videoId'
          element={
            <AuthLayout authentication>
              <VideoDetails />
            </AuthLayout>
          }
        />
        <Route
          path='/terms&conditions'
          element={
            <AuthLayout authentication>
              <TermsAndConditions />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  )
}

export default App