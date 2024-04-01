import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    RiFeedbackLine,
    IoMdHelpCircleOutline,
    GoSignOut,
    MdLightMode,
    HiOutlineVideoCamera,
    BiLike,
    RiPlayList2Fill,
    CiSettings,
    IoIosCloseCircleOutline
} from '../icons'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../store/slices/authSlice'
import Logo from '../Logo'


const RightSidebar = ({ profileImg, username, fullName, authStatus, setToggleRightSidebar }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signOutHandler = () => {
        dispatch(userLogout())
        navigate("/login")
    }

    const items = [
        {
            icon: <GoSignOut size={22} />,
            name: "Log Out",
        },
        {
            icon: <MdLightMode size={22} />,
            name: "Light Mode",
        },
        {
            icon: <IoMdHelpCircleOutline size={22} />,
            name: "Help"
        },
        {
            icon: <RiFeedbackLine size={22} />,
            name: "Send Feedback"
        }
    ]

    const mobileItems = [
        {
            icon: <BiLike size={20} />,
            name: "Liked Videos",
            url: '/liked-videos'
        },
        {
            icon: <HiOutlineVideoCamera size={20} />,
            name: "My Content",
            url: `/channel/${username}`
        },
        // {
        //     icon: <RiPlayList2Fill size={20} />,
        //     name: "Playlist",
        // },
        {
            icon: <MdLightMode size={20} />,
            name: "Light Mode",
        },
        {
            icon: <CiSettings size={20} />,
            name: "Settings",
        },
        {
            icon: <IoMdHelpCircleOutline size={20} />,
            name: "Help"
        },
        {
            icon: <RiFeedbackLine size={22} />,
            name: "Send Feedback"
        }
    ]

    return (
        <>
            <div className=' hidden sm:block w-64 fixed top-[20px] z-50 right-[75px]  bg-[#212121] rounded-lg text-white duration-200'>
                <div className='mx-4 py-4 flex gap-x-4 border-b border-gray-600 '>
                    <img src={profileImg} alt="" className=' w-12 h-12 rounded-full border object-cover' />
                    <div>
                        <p className=' text-lg'>{fullName}</p>
                        <p className=' text-slate-300 text-base'>@{username}</p>
                        <Link
                            to={`/channel/${username}`}
                            onClick={() => setToggleRightSidebar(false)}
                            className=' text-blue-500 text-xs hover:underline'
                        >View your channel
                        </Link>
                    </div>
                </div>
                <div className=' flex flex-col px-2 py-3'>
                    {
                        items.map(item => (
                            <div
                                className=' w-full  rounded-lg flex items-center gap-x-3 hover:bg-purple-500 cursor-pointer py-2 px-4'
                                onClick={(item.name == "Log Out") ? signOutHandler : null}
                                key={item.name}
                            >
                                {item.icon}
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* For small devices */}
            <div className=' sm:hidden w-full h-full fixed top-0 left-0 bg-black bg-opacity-75 z-50'>
                <div className='w-3/4 h-screen bg-[#212121] flex flex-col float-right'>
                    {authStatus ? (
                        <div className=' p-4 relative  flex gap-x-4 border-b border-gray-600 '>
                            <img src={profileImg} alt="user profile" className=' w-10 h-10 rounded-full border object-cover' />
                            <div>
                                <p className=' text-base'>{fullName}</p>
                                <p className=' text-slate-300 text-sm'>@{username}</p>
                                <Link
                                    to={`/channel/${username}`}
                                    className=' text-blue-500 text-xs hover:underline'
                                    onClick={() => setToggleRightSidebar(false)}
                                >View your channel
                                </Link>
                            </div>
                            <div className=' absolute top-5 right-5 cursor-pointer'>
                                <IoIosCloseCircleOutline size={30} onClick={() => setToggleRightSidebar((prev) => !prev)} />
                            </div>
                        </div>
                    ) : (
                        <div className=' flex justify-between items-center py-5 px-4 border-b border-gray-600'>
                            <Logo />
                            <span className=' absolute top-5 right-5 cursor-pointer'>
                                <IoIosCloseCircleOutline size={30} onClick={() => setToggleRightSidebar((prev) => !prev)} />
                            </span>
                        </div>
                    )}

                    <div className=' flex flex-col px-4 mt-3'>
                        <div className=' flex flex-col gap-y-2 '>
                            {mobileItems.map(item => (
                                <div
                                    className=' w-full  rounded-lg flex items-center gap-x-5 cursor-pointer py-2 px-4 border-b border-gray-600'
                                    key={item.name}
                                    onClick={() => {
                                        if (item.url) {
                                            navigate(item.url)
                                            setToggleRightSidebar((prev) => !prev)
                                        }
                                    }}
                                >
                                    {item.icon}
                                    <p className=' text-base'>{item.name}</p>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className=' flex justify-center mt-10'>
                        {
                            !authStatus ? (
                                <div className=' space-x-4'>
                                    <button className='w-[80px] text-sm  py-2 rounded-lg border border-[#245af0] text-[#245af0]'>
                                        <Link to="/login">Log in</Link>
                                    </button>
                                    <button className=' w-[80px] text-sm py-2 rounded-lg border border-[#245af0] text-[#245af0]'>
                                        <Link to="/signup">Sign up</Link>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className=' flex justify-center items-center gap-2 text-sm px-4 py-2 rounded-lg border border-[#245af0] text-[#245af0] '
                                    onClick={signOutHandler}
                                >
                                    <GoSignOut size={20} />
                                    Log out
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default RightSidebar
