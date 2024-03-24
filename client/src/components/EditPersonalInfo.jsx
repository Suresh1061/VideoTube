import React, { useEffect } from 'react'
import { Input, Button } from "./index"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccountDetails } from '../store/slices/authSlice'

function EditPersonalInfo() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const user = useSelector((state) => state.auth?.userData)

  useEffect(() => {
    setValue("fullName", user?.fullName)
    setValue("email", user?.email)
  }, [user, setValue])

  const updateAccount = (data) => {
    dispatch(updateAccountDetails(data))
  }

  const reset = (e) => {
    e.preventDefault()
    setValue("fullName", user?.fullName)
    setValue("email", user?.email)
  }

  return (
    <div className=' w-full flex justify-center items-center text-white mt-5'>
      <div className=' p-4 rounded-lg border border-slate-600'>
        <div className=' mb-4'>
          <h2 className=' text-lg font-semibold'>Personal Information</h2>
          <p className=' text-xs text-slate-400'>write your personal details here.</p>
        </div>
        <form
          onSubmit={handleSubmit(updateAccount)}
          className=' space-y-4'
        >
          <div className=' flex flex-col'>
            <Input
              label="Full Name : "
              className=" rounded-lg"
              {...register("fullName", {
                required: "full name is required",
              })}
            />
            {errors.fullName && (
              <span className=' text-sm text-red-500'>
                {errors.fullName?.message}
              </span>
            )}
          </div>
          <div className=' flex flex-col'>
            <Input
              label="Email Address : "
              className=" rounded-lg"
              {...register("email", {
                required: "email is required"
              })}
            />
            {errors.email && (
              <span className=' text-sm text-red-500'>
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className=' flex justify-between items-center'>
            <Button
              className="px-4 py-2 rounded-md hover:scale-105"
              bgColor='bg-[#414141]'
              onClick={(e) => reset(e)}
            >
              Reset
            </Button>
            <Button
              className="px-4 py-2 rounded-md hover:scale-105"
              bgColor='bg-violet-600'
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPersonalInfo