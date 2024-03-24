import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changePassword } from '../store/slices/authSlice'
import { Input, Button } from "./index"

function UpdatePassword() {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField
  } = useForm()
  const updatePassword = (data) => {
    dispatch(changePassword({
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword
    }))
    resetField("oldPassword")
    resetField("newPassword")
    resetField("confirmPassword")
  }


  return (
    <div className=' w-full flex justify-center items-center text-white mt-5'>
      <div className=' p-4 rounded-lg border border-slate-600'>
        <h2 className=' text-lg font-semibold mb-4'>Change Password</h2>
        <form
          onSubmit={handleSubmit(updatePassword)}
          className=' space-y-4'
        >
          <div className=' flex flex-col'>
            <Input
              label="Old Password : "
              type="password"
              className=" rounded-md"
              {...register("oldPassword", {
                required: "old password is required",
              })}
            />
            {errors.oldPassword && (
              <span className=' text-sm text-red-500'>
                {errors.oldPassword?.message}
              </span>
            )}
          </div>
          <div className=' flex flex-col'>
            <Input
              label="New Password : "
              type="password"
              className=" rounded-md"
              {...register("newPassword", {
                required: "new password is required",
                minLength: {
                  value: "6",
                  message: "password must be at least 6 characters"
                }
              })}
            />
            {errors.newPassword && (
              <span className=' text-sm text-red-500'>
                {errors.newPassword?.message}
              </span>
            )}
          </div>
          <div className=' flex flex-col'>
            <Input
              label="Confirm New Password : "
              type="password"
              className=" rounded-md"
              {...register("confirmPassword", {
                required: "please confirm your new password",
                validate: {
                  matchesNewPassword: (value) =>
                    value === getValues("newPassword") ||
                    "Password not match",
                },
              })}
            />
            {errors.confirmPassword && (
              <span className=' text-sm text-red-500'>
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <div className=' flex justify-center items-center'>
            <Button
              className="px-4 py-2 rounded-md hover:scale-105"
              bgColor='bg-violet-600'
              type="submit"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword