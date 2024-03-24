import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createPlaylist } from '../store/slices/playlistSlice'
import { Input, Button} from "./index"

function CreatePlaylist({ setPopUp }) {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = (data) => {
        dispatch(createPlaylist(data))
        setPopUp((prev) => ({
            ...prev,
            create: false
        }))
    }
    return (
        <div className=' w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-60 z-50'>
            <div className=' relative p-4 border border-gray-600 rounded-lg bg-black '>
                <div className=' flex justify-between items-center mb-4'>
                    <h1 className=' text-2xl font-semibold'>Create Playlist</h1>
                    <IoCloseCircleOutline
                        size={25}
                        className=' cursor-pointer'
                        onClick={() => setPopUp((prevState) => ({
                            ...prevState,
                            create: false
                        }))}
                    />
                </div>
                <form
                    className=' space-y-5'
                    onSubmit={handleSubmit(create)}
                >
                    <Input
                        label="Name :"
                        placeholder="Enter playlist name"
                        {...register("name", {
                            required: "name is required"
                        })}
                    />
                    {errors && (
                        <span className=' text-sm text-red-500'>
                            {errors?.name?.message}
                        </span>
                    )}
                    <Input
                        label="Description :"
                        placeholder="Enter description of your playlist"
                        {...register("description", {
                            required: "description is required"
                        })}
                    />
                    {errors && (
                        <span className=' text-sm text-red-500'>
                            {errors?.description?.message}
                        </span>
                    )}
                    <Button
                        type='submit'
                        className="w-full py-2 rounded-lg"
                    >Create</Button>
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylist