import React from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Loading, Logo } from './index'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, userLogin } from '../store/slices/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'


const LogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth?.loading)
    const navigate = useNavigate()

    const submit = async (data) => {
        const isEmail = data.username.includes('@')
        const loginDetails = isEmail
            ? { email: data.username, password: data.password }
            : data
        const res = await dispatch(userLogin(loginDetails))
        const user = await dispatch(getCurrentUser(res?.payload?.accessToken))
        if (user && res?.payload) {
            navigate('/')
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className=' w-full h-screen flex justify-center items-start text-white p-3'>
            <div className=' max-w-3xl mx-auto shadow-lg border border-gray-600 rounded-lg px-10 py-6 mt-20'>
                <div className=' mb-4 flex justify-center items-center'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className=' space-y-5'>
                        <Input
                            className="rounded-lg"
                            label="Username / Email : "
                            type="text"
                            placeholder="example@gmail.com"
                            {...register('username', {
                                required: "username / email is required",
                            })}
                        />
                        {errors.username && (
                            <span className=' text-red-500'>
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            className="rounded-lg"
                            label="Password : "
                            type="password"
                            placeholder="1kd074fjw0"
                            {...register('password', {
                                required: "password is required",
                            })}
                        />
                        {errors.password && (
                            <span className=' text-red-500'>
                                {errors.password.message}
                            </span>
                        )}
                        <Button
                            type='submit'
                            className=' w-full rounded-lg hover:bg-[#ae7aff] py-2'
                        >
                            Log in
                        </Button>
                        <p className=' text-center text-sm'>
                            Dont&apos;t have any account? &nbsp;
                            <Link to='/signup' className='text-blue-600 cursor-pointer duration-200 hover:underline'>
                                Create Account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn
