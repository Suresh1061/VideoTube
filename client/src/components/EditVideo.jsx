import React, { useEffect } from "react";
import { Input, Button, ImagePreview, Spinner } from "./index"
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateVideoDetails, updateUploadState } from "../store/slices/videoSlice";

function EditVideo({
    videoId,
    thumbnail,
    title,
    description,
    setEditVideoPopUp,
}) {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue
    } = useForm()
    const dispatch = useDispatch()
    const uploading = useSelector(state => state.video.uploading)

    const updateVideo = async (data) => {
        await dispatch(updateVideoDetails({ videoId, data }))
        setEditVideoPopUp((prev) => ({
            ...prev,
            editVideo: !prev.editVideo
        }));

        dispatch(updateUploadState())
    }

    const handleClosePopUp = () => {
        setEditVideoPopUp((prev) => ({
            ...prev,
            editVideo: !prev.editVideo
        }))
    }

    useEffect(() => {
        setValue("title", title);
        setValue("description", description);
    }, [title, description, setValue]);

    if (uploading) {
        return (
            <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-start bg-black bg-opacity-75 z-50' >
                <div className=' mt-20 flex justify-center items-center gap-2 p-4 bg-black border border-gray-600 rounded-md'>
                    <Spinner />
                    <p className=' text-lg'>Updating Video....</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="fixed  top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
                <form
                    onSubmit={handleSubmit(updateVideo)}
                    className=" bg-black space-y-2 border  border-gray-600 rounded-md shadow-lg h-[30rem] overflow-y-scroll outline-none"
                >
                    <div className="sticky left-0 top-0 z-50 bg-black flex justify-between items-center border-b border-gray-600 px-4 py-2">
                        <div>
                            <h2 className="font-bold">Edit Video</h2>
                            <p className="text-xs mb-2 opacity-85">
                                Share where you`ve worked on your profile.
                            </p>
                        </div>
                        <IoCloseCircleOutline
                            size={23}
                            onClick={handleClosePopUp}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-5 z-40">
                        <div>
                            <ImagePreview
                                name={"thumbnail"}
                                control={control}
                                label={"Thumbnail: "}
                                cameraIcon
                                cameraSize={30}
                                className={
                                    "object-contain w-full min-w-xl h-72 min-h-32 "
                                }
                                image={thumbnail}
                            />
                            <span className="text-red-500 text-xs">
                                {errors.thumbnail?.message}
                            </span>
                        </div>

                        <div className="flex flex-col justify-between sm:gap-0 gap-2">
                            <Input
                                type="text"
                                label="Title :"
                                className="rounded-md bg-transparent"
                                // value={title}
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                            <span className="text-red-500 text-xs">
                                {errors.title?.message}
                            </span>
                            <div className="mb-4">
                                <label>Description :</label>
                                <textarea
                                    rows="6"
                                    className=" bg-transparent focus:bg-[#212121] rounded-md text-sm overflow-y-scroll outline-none border border-gray-600 w-full mt-1 p-1"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                ></textarea>
                                <span className="text-red-500 text-xs">
                                    {errors.description?.message}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1  p-2 rounded-lg"
                                    bgColor='bg-[#212121] hover:bg-[#414141] '
                                    onClick={handleClosePopUp}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-purple-500 p-2 font-bold rounded-lg"
                                    textColor="text-black"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditVideo;
