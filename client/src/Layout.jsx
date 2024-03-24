import React from 'react'
import { Header, UploadVideo } from './components'
import { Outlet } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
import MyContent from './pages/Channel/Channel'
import Sidebar from './components/header/Sidebar'


const Layout = () => {
    return (
        <>
            <Header />
            <div className=' sm:flex flex-none'>
                <div>
                    <Sidebar />
                </div>
                <div className=' sm:flex-1'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
