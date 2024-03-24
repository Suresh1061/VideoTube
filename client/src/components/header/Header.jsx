import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { CiSearch, IoMenu, RiVideoAddLine, FiSearch } from "../icons"
import { Search, RightSidebar, SearchForSmallDevices, Logo } from '../index';

const Header = ({ uploadVideoPopUp, setUploadVideoPopUp }) => {
  const [toggleRightSidebar, setToggleRightSidebar] = useState(false)

  {/* for small devices only */ }
  const [openSearch, setOpenSearch] = useState(false)

  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth?.status)
  const profileImg = useSelector(state => state.auth?.userData?.avatar?.url)
  const user = useSelector(state => state.auth?.userData)

  // const [data, setData] = useState(true)
  // console.log(data)
  return (
    <div >
      <nav className=' w-full h-[70px] flex justify-between items-center bg-[#121212] shadow border-b-2 border-gray-600  fixed top-0 z-50 inset-x-0 px-4 sm:px-6 '>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className=' relative w-full sm:w-1/3 hidden sm:block'>
          <div>
            <Search className=' pl-10 rounded-lg' />
            <FiSearch color='gray' className='absolute top-3 left-3' />
          </div>
        </div>
        {
          !authStatus ?
            <>
              <div className='space-x-5 hidden sm:block'>
                <Link to={"/login"}>
                  <button className=' px-6 py-2 rounded-full text-white hover:bg-[#930ced] duration-200 font-medium'>
                    Log in
                  </button>
                </Link>
                <Link to={'/signup'}>
                  <button className=' px-6 py-2 rounded-full text-white bg-[#930ced] duration-200 font-medium'>
                    Sign up
                  </button>
                </Link>
              </div>
              <IoMenu
                size={25}
                className=' sm:hidden'
                onClick={() => setToggleRightSidebar(!toggleRightSidebar)}
              />
            </>
            :
            <div className=' flex gap-3 sm:gap-4 items-center'>
              <div className=' flex items-center gap-1'>
                <div className=' sm:hidden h-10 w-10 rounded-full hover:bg-[#414141] flex justify-center items-center p-2'>
                  <CiSearch
                    size={20}
                    className=' object-cover cursor-pointer'
                    onClick={() => setOpenSearch(!openSearch)}
                  />
                  {openSearch && <SearchForSmallDevices setOpenSearch={setOpenSearch} />}
                </div>
                {/* <div className=' h-10 w-10 rounded-full hover:bg-[#414141] flex justify-center items-center p-2'>
                  <RiVideoAddLine
                    size={20}
                    className=' object-cover cursor-pointer'
                    onClick={()=>setUploadVideoPopUp((prev) => ({
                      ...prev,
                      uploadVideo: true
                    }))}
                  />
                  {uploadVideoPopUp && <UploadVideo setUploadVideoPopUp={setUploadVideoPopUp}/>}
                </div> */}
              </div>
              <button onClick={() => setToggleRightSidebar(!toggleRightSidebar)}>
                <img src={profileImg}
                  alt="menu_image"
                  className=' w-10 h-10 rounded-full border-2  cursor-pointer border-gray-600 object-cover'
                />
              </button>
            </div>
        }
      </nav>
      {
        toggleRightSidebar ?
          <RightSidebar
            profileImg={profileImg}
            username={user?.username}
            fullName={user?.fullName}
            authStatus={authStatus}
            setToggleRightSidebar={setToggleRightSidebar}
          /> : null
      }
    </div>
  )
}

export default Header
