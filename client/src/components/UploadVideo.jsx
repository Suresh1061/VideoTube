import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { IoCloseCircleOutline } from "./icons"
import { Button, Input, UploadingVideo } from './index'
import { useDispatch, useSelector } from "react-redux"
import { uploadVideo } from "../store/slices/videoSlice"

const UploadVideo = ({ setUploadVideoPopUp }) => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [videoName, setVideoName] = useState("")
    const [videoSize, setVideoSize] = useState(0)

    const dispatch = useDispatch()
    const uploading = useSelector(state => state.video.uploading)
    const uploaded = useSelector(state => state.video.uploaded)

    const publishVideo = async (data) => {
        setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)))
        await dispatch(uploadVideo(data))
    }

    if (uploading) {
        return (
            <>
                <UploadingVideo
                    videoFileName={videoName}
                    fileSize={videoSize}
                    setUploadVideoPopUp={setUploadVideoPopUp}
                />
            </>
        )
    }

    if (uploaded) {
        return (
            <>
                <UploadingVideo
                    videoFileName={videoName}
                    fileSize={videoSize}
                    setUploadVideoPopUp={setUploadVideoPopUp}
                    uploaded={uploaded}
                />
            </>
        )
    }
    return (
        <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50'>
            <div className=' relative w-[95vw] sm:w-3/4 h-[80vh] mx-auto  border border-gray-600 rounded-lg overflow-y-scroll bg-black text-white'>
                <form
                    className=' space-y-5'
                    onSubmit={handleSubmit(publishVideo)}
                >
                    <section className=' bg-[#212121] h-12 sticky top-0 z-50 border-b border-gray-600 flex justify-between items-center px-3'>
                        <div className=" flex gap-1 items-center cursor-pointer" >
                            <IoCloseCircleOutline
                                size={20}
                                onClick={() => setUploadVideoPopUp((prev) => ({
                                    ...prev,
                                    uploadVideo: !prev.uploadVideo
                                }))}
                            />
                            <h3 className=' font-semibold '>Upload Video</h3>
                        </div>
                        <div>
                            <Button
                                className="px-3 py-1  hover:scale-110  rounded-full"
                                textColor="text-black"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </section>
                    <section className="px-3">
                        <div className=" w-full border border-dotted rounded-md h-44 p-1 flex flex-col gap-3 justify-center items-center text-center">
                            <div>
                                <h1 className=" font-medium text-sm">Drag and Drop video files to upload</h1>
                                <p className=" text-xs text-slate-400">Your videos will be private untill you publish them.</p>
                            </div>
                            <label
                                htmlFor="video-upload"
                                className=" cursor-pointer bg-purple-500 px-5 py-2 rounded-lg"
                            >
                                Select Files
                            </label>
                            <input
                                id="video-upload"
                                type="file"
                                accept="video/*"
                                className="hidden"
                                {...register("videoFile", {
                                    required: "VideoFile is required",
                                    onChange: (e) =>
                                        setVideoName(
                                            e.target.files[0]?.name
                                        ),
                                })}
                            />
                            <input
                                className=" sm:w-3/4 w-full text-center h-10 bg-transparent text-white outline-none"
                                value={videoName}
                                readOnly
                            />
                            <span className=" text-red-500 text-sm">
                                {errors.videoFile?.message}
                            </span>
                        </div>
                        <div className=" space-y-3 mt-2">
                            <Input
                                className="rounded-lg"
                                label="Thumbnail :"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                {...register("thumbnail", {
                                    required: "Thumbnail is required"
                                })}
                            />
                            <span className=" text-red-500 text-sm">
                                {errors.thumbnail?.message}
                            </span>
                            <Input
                                className="rounded-lg"
                                label="Title :"
                                {...register("title", {
                                    required: "Title is required"
                                })}
                            />
                            <span className=" text-red-500 text-sm">
                                {errors.title?.message}
                            </span>
                            <div>
                                <label className=" mt-1 pl-1">Description :</label>
                                <textarea
                                    rows="5"
                                    className="px-3 py-2 bg-[#121212] text-white border border-gray-600 border-black/10 outline-none rounded-lg duration-200 focus:bg-[#212121] w-full"
                                    {...register("description", {
                                        required: "Description is required"
                                    })}
                                />
                                <span className=" text-red-500 text-sm">
                                    {errors.description?.message}
                                </span>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </div>

    )
}

export default UploadVideo
