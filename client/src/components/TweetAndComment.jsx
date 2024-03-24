import React from 'react'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createComment } from '../store/slices/commentSlice'
import { createTweet } from '../store/slices/tweetSlice'

function TweetAndComment({ videoId, tweet, comment }) {
    const dispatch = useDispatch()
    const { handleSubmit, register, formState: { errors }, setValue } = useForm()

    const create = (data) => {
        if (data) {
            if (tweet) {
                dispatch(createTweet(data));
            } else if (comment) {
                dispatch(createComment({ content: data.content, videoId }));
            }
            setValue("content", "");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(create)}
            className=' sm:px-5 sm:py-5 px-2 py-2'
        >
            <div className=' relative'>
                <textarea
                    placeholder={`${tweet ? "Write a tweet" : "Add a Comment"}`}
                    rows={3}
                    className=' p-2 rounded-lg border border-gray-600 w-full bg-[#212121] duration-200 focus:bg-[#222222] outline-none'
                    {...register('content', {
                        required: "content is required"
                    })}
                />
                <span className=' text-red-500'>
                    {errors.content?.message}
                </span>
                <Button
                    type='submit'
                    className="px-4 py-1 rounded-full hover:scale-105 font-medium absolute bottom-3 right-2"
                    bgColor=' bg-purple-600'
                    textColor=' text-black'
                >
                    Send
                </Button>
            </div>
        </form>
    )
}

export default TweetAndComment