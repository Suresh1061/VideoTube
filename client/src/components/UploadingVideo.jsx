import React from 'react'
import { useDispatch } from 'react-redux'
import { IoCloseCircleOutline, TiTick, PiFilmReelFill } from "./icons";
import { Button, Spinner } from "./index"
import { updateUploadState } from '../store/slices/videoSlice';

const UploadingVideo = ({
    videoFileName = "Hi Nanna_ Samayama Lyrical Video Song _ Nani_Mrunal Thakur _ Shouryuv _ Hesham Abdul Wahab(1080P_HD)",
    fileSize = 0,
    setUploadVideoPopUp,
    uploaded,
}) => {
    const dispatch = useDispatch()

    const handelCancelAndFinish = () => {
        setUploadVideoPopUp((prev) => ({
            ...prev,
            uploadVideo: false,
        }))
        dispatch(updateUploadState());
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50'>
            <div className=' w-96 p-4 text-white border border-gray-600 rounded-lg space-y-3 bg-black'>
                <div className=' flex justify-between items-start'>
                    <div>
                        {uploaded ? (
                            <h1 className=' text-lg font-bold'>
                                Uploaded Video
                            </h1>
                        ) : (
                            <h1 className=' text-lg font-bold'>
                                Uploading Video...
                            </h1>
                        )}
                        <span className=' text-xs text-slate-600'>
                            Tracking your video uploading process.
                        </span>
                    </div>
                    <IoCloseCircleOutline
                        size={25}
                        className=' cursor-pointer'
                        onClick={handelCancelAndFinish}
                    />
                </div>
                <div>
                    <div className=" w-full flex  gap-2">
                        <div className=' h-6 w-6 '>
                            <PiFilmReelFill
                                size={24}
                                className="text-purple-500 object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-xs font-semibold">
                                {videoFileName}
                            </h1>
                            <p className="text-xs text-slate-400">{fileSize} MB</p>
                        </div>
                    </div>
                    <div className="flex  justify-center items-center mt-3">
                        {uploaded ? (
                            <span className="text-sm flex items-center justify-center">
                                <TiTick
                                    size={25}
                                    className="text-purple-500"
                                />
                                Uploaded Successfully
                            </span>
                        ) : (
                            <span className="text-sm flex items-center gap-1">
                                <Spinner
                                    width=' w-4 h-4'
                                />
                                Loading ...
                            </span>
                        )}
                    </div>
                </div>
                <div className=' flex'>
                    {uploaded && (
                        <Button
                            className=' bg-purple-500 rounded-lg flex-1 border-none py-2 font-medium tracking-wide'
                            textColor=' text-black'
                            onClick={handelCancelAndFinish}
                        >
                            Finish
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UploadingVideo
