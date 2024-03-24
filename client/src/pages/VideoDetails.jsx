import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { findVideo } from '../store/slices/videoSlice';
import { cleanUpComments, getAllVideoComments } from '../store/slices/commentSlice';
import {
    Spinner,
    Video,
    Header,
    VideoDescription,
    TweetAndComment,
    CommentList,
    InfiniteScroll
} from '../components';

function VideoDetails() {
    const dispatch = useDispatch();
    const { videoId } = useParams();
    const video = useSelector((state) => state.video?.video)
    const comments = useSelector(state => state.comment?.comments)
    const totalComments = useSelector(state => state.comment?.totalComments)
    const hasNextPage = useSelector(state => state.comment?.hasNextPage)
    const loading = useSelector(state => state.comment?.loading)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (videoId) {
            dispatch(findVideo({ videoId }));
            dispatch(getAllVideoComments({ videoId }))
        }

        return () => dispatch(cleanUpComments())
    }, [dispatch, videoId])

    const fetchMoreComments = useCallback(() => {
        if (!loading && hasNextPage) {
            dispatch(getAllVideoComments({ videoId, page: page + 1 }))
            setPage(page + 1)
        }
    }, [page, hasNextPage, loading, videoId, dispatch])

    return (
        <>
            <Header />
            <main className=' sm:pl-10 sm:max-w-4xl w-full '>
                <Video
                    src={video?.videoFile?.url}
                    poster={video?.thumbnail?.url}
                />
                <VideoDescription
                    key={video?._id}
                    videoId={video?._id}
                    title={video?.title}
                    views={video?.views}
                    createdAt={video?.createdAt}
                    avatar={video?.owner?.avatar?.url}
                    description={video?.description}
                    channelName={video?.owner?.username}
                    likesCount={video?.likeCount}
                    isLiked={video?.isLiked}
                    subscribersCount={video?.owner?.subscriberCount}
                    isSubscribed={video?.owner?.isSubscribed}
                    channelId={video?.owner?._id}
                />
                <div className=' text-lg font-semibold  sm:px-5 px-2'>
                    {totalComments} comments
                </div>
                <TweetAndComment
                    videoId={video?._id}
                    comment={true}
                />
                <InfiniteScroll
                    fetchMore={fetchMoreComments}
                    hasNextPage={hasNextPage}
                >
                    <div className=' w-full sm:max-w-4xl my-2 sm:px-5 px-2'>
                        {comments.map(comment => (
                            <CommentList
                                key={comment?._id}
                                commentId={comment?._id}
                                commentOwner={comment?.owner?.username}
                                avatar={comment?.owner?.avatar?.url}
                                createdAt={comment?.createdAt}
                                comment={comment?.content}
                                isLiked={comment?.isLiked}
                                likeCount={comment?.likeCount}
                            />
                        ))}
                        {loading && (
                            <div className=' w-full flex justify-center items-center '>
                                <Spinner />
                            </div>
                        )}
                    </div>
                </InfiniteScroll>
            </main>
        </>
    )
}

export default VideoDetails