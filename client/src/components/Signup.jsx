import React from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo, Loading, ImagePreview } from './index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createAccount, userLogin } from '../store/slices/authSlice.js'

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.auth.loading)

    const create = async (data) => {
        console.log(data)
        const response = await dispatch(createAccount(data))
        if (response?.payload?.success) {
            const username = data?.username
            const password = data?.password
            const loginResult = await dispatch(
                userLogin({ username, password })
            )
            console.log(loginResult)
            if (loginResult.type === "login/fulfilled") {
                navigate("/terms&conditions")
            } else {
                navigate('/login')
            }
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className=' w-full h-screen flex justify-center items-start text-white p-3 sm:mt-10'>
            <div className='flex flex-col space-y-2 justify-center items-center border border-gray-600 px-10 py-6 rounded-lg'>
                <div className=' mb-4 flex justify-center items-center'>
                    <Logo />
                </div>
                <form
                    onSubmit={handleSubmit(create)}
                    className=' space-y-5 sm:w-96 w-full '
                >
                    <div className="w-full relative h-28 bg-[#222222]">
                        <div className="w-full h-full">
                            <ImagePreview
                                name="coverImage"
                                control={control}
                                className="w-full h-28 object-cover border-none border-slate-900"
                                cameraIcon
                            />
                            <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                                cover Image
                            </div>
                        </div>
                        <div className="absolute left-2 bottom-2 rounded-full border-2">
                            <ImagePreview
                                name="avatar"
                                control={control}
                                className="object-cover rounded-full h-20 w-20 bg-[#121212] outline-none"
                                cameraIcon={true}
                                cameraSize={20}
                            />
                        </div>
                    </div>
                    {errors.avatar && (
                        <span className=' text-red-500'>
                            {errors.avatar.message}
                        </span>
                    )}
                    <Input
                        className="rounded-lg"
                        label="Username : "
                        placeholder="Enter your username"
                        {...register("username", {
                            required: "username is required"
                        })}
                    />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                    <Input
                        className="rounded-lg"
                        label="Full Name : "
                        placeholder=" Enter your full name"
                        {...register('fullName', {
                            required: "full name is required"
                        })}
                    />
                    {errors.fullName && (
                        <span className=' text-red-500'>
                            {errors.fullName.message}
                        </span>
                    )}
                    <Input
                        className="rounded-lg"
                        label="Email : "
                        type="email"
                        placeholder=" Enter your email address"
                        {...register('email', {
                            required: "email is required",
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                        })}
                    />
                    {errors.email && (
                        <span className=' text-red-500'>
                            {errors.email.message}
                        </span>
                    )}
                    <Input
                        className="rounded-lg"
                        label="Password : "
                        type="password"
                        placeholder=" Enter your password"
                        {...register('password', {
                            required: "password is required"
                        })}
                    />
                    {errors.password && (
                        <span className=' text-red-500'>
                            {errors.password.message}
                        </span>
                    )}
                    {/* <Input
                            className="rounded-lg"
                            label="Profile Picture : "
                            type='file'
                            placeholder=''
                            {...register('avatar', {
                                required: true
                            })}
                        /> */}
                    <Button
                        type='submit'
                        className=' w-full hover:bg-[#ae7aff] py-2 rounded-lg'
                    >
                        Create Account</Button>
                    <p className=' text-center text-sm'>
                        Already have an account ? &nbsp;
                        <Link to='/login' className='text-blue-600 cursor-pointer duration-200 hover:underline'>
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
