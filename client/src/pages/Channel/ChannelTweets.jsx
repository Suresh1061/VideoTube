import React, { useEffect } from 'react'
import { TweetAndComment, TweetList } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTweet } from '../../store/slices/tweetSlice'


function ChannelTweets() {
    const dispatch = useDispatch()
    const authId = useSelector((state) => state.auth?.userData?._id)
    const userId = useSelector((state) => state.user?.profileDetails?._id)
    const tweets = useSelector((state) => state.tweet?.tweets)
    // const tweetLength = useSelector((state) => state.tweet?.tweetLength)

    // console.log(tweetLength)

    useEffect(() => {
        if (userId) dispatch(getUserTweet(userId))
    }, [dispatch, userId])

    return (
        <>
            {userId === authId && <TweetAndComment tweet={true} />}
            {tweets?.map((tweet) => (
                <TweetList
                    key={tweet?._id}
                    tweetId={tweet?._id}
                    tweet={tweet?.content}
                    username={tweet?.owner?.username}
                    avatar={tweet?.owner?.avatar?.url}
                    createdAt={tweet?.createdAt}
                    isLiked={tweet?.isLiked}
                    likeCount={tweet?.likeCount}
                />
            ))}
        </>
    )
}

export default ChannelTweets