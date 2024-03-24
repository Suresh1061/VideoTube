import React from 'react'
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    MdOutlineContactSupport,
    RiHome6Line,
    TbUserCheck,
} from "../icons"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const username = useSelector(state => state.auth?.userData?.username)
    const sideItems = [
        {
            icon: <RiHome6Line size={25} />,
            name: "Home",
            url: '/'
        },
        {
            icon: <BiLike size={25} />,
            name: "Liked Videos",
            url: '/liked-videos'
        },
        {
            icon: <BiHistory size={25} />,
            name: "History",
            url: '/history'
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            name: "My Content",
            url: `/channel/${username}`
        },
        {
            icon: <IoFolderOutline size={25} />,
            name: "Collection",
            url: '/collections'
        },
        {
            icon: <TbUserCheck size={25} />,
            name: "Subscription",
            url: '/subscriptions'
        }
    ]

    const bottomItems = [
        {
            icon: <RiHome6Line size={25} />,
            name: "Home",
            url: '/'
        },
        {
            icon: <BiHistory size={25} />,
            name: "History",
            url: '/history'
        },
        {
            icon: <IoFolderOutline size={25} />,
            name: "Collection",
            url: '/collections'
        },
        {
            icon: <TbUserCheck size={25} />,
            name: "Subscription",
            url: '/subscriptions'
        },
    ]

    return (
        <>
            <div className=' sm:block hidden'>
                <div className=' bg-[#121212] pt-24 border-r border-gray-600 lg:w-60 md:w-48 w-16  text-white h-screen  px-3 flex flex-col justify-between'>
                    <div className='flex flex-col gap-4'>
                        {
                            sideItems.map(item => (
                                <NavLink
                                    key={item.name}
                                    to={item.url}
                                    className={({ isActive }) =>
                                        isActive ? "bg-purple-500 rounded-md" : ""}
                                >
                                    <div className=' flex items-center gap-3 border border-gray-700  p-2 hover:bg-purple-500 duration-150 rounded-md'>
                                        {item.icon}
                                        <span className=' text-base hidden md:block'>
                                            {item.name}
                                        </span>
                                    </div>
                                </NavLink>
                            ))
                        }
                    </div>
                    <div>
                        <div className=' flex items-center gap-3 border border-gray-700 my-2 p-2 hover:bg-purple-500 duration-150 rounded-md cursor-pointer'>
                            <MdOutlineContactSupport size={25} />
                            <span className=' text-base hidden md:block'>
                                Support
                            </span>
                        </div>
                        <div className=' flex items-center gap-3 border border-gray-700 my-2 p-2 hover:bg-purple-500 duration-150 rounded-md cursor-pointer'>
                            <CiSettings size={25} />
                            <span className=' text-base hidden md:block'>
                                Setting
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* for small devices */}
            <div className=' w-full h-16 p-1 text-white sm:hidden fixed bottom-0 z-30 flex justify-around  bg-[#121212] border-t border-gray-600'>
                {
                    bottomItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.url}
                            className={({ isActive }) =>
                                isActive ? "text-purple-500 " : ""}
                        >
                            <div className=' flex flex-col items-center  p-2 duration-150'>
                                {item.icon}
                                <span className=' text-sm'>{item.name}</span>
                            </div>
                        </NavLink>
                    ))}
            </div>
        </>
    )
}

export default Sidebar
