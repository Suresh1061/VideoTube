import React, { useState } from 'react'
import { timeAgo } from '../helpers/timeAgo'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, updateComment } from '../store/slices/commentSlice';
import { HiOutlineDotsVertical } from "./icons";
import { Like, DeleteConfirmation, Edit } from "./index"

function CommentList({
  commentId,
  comment,
  commentOwner,
  avatar,
  createdAt,
  isLiked,
  likeCount
}) {
  // console.log(commentId, commentOwner, avatar)
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar?.url)
  const authUser = useSelector((state) => state.auth?.userData?.username)
  const dispatch = useDispatch()

  const [editable, setEditable] = useState({
    editedContent: comment,
    editing: false,
    isOpen: false,
    delete: false,
  })

  const handelDeleteComment = () => {
    dispatch(deleteComment(commentId))
    setEditable((prevState) => ({
      ...prevState,
      delete: false
    }))
  }

  const handelEditComment = (editedContent) => {
    console.log(editedContent)
    dispatch(updateComment({ content: editedContent, commentId }))
    setEditable((prevState) => ({
      ...prevState,
      editedContent,
      isOpen: false,
      editing: false,
      delete: false
    }))
  }

  return (
    <div className="text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
      <div className=' w-12'>
        <img src={avatar || avatar2}
          alt=""
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
      <div className=' w-full flex flex-col gap-1 relative'>
        <div className="flex items-center gap-2">
          <h2 className="text-xs capitalize">{commentOwner}</h2>
          <span className="text-xs text-slate-400">
            {timeAgo(createdAt)}
          </span>
        </div>
        {/*dropdown for edit and delete comment*/}
        {authUser == commentOwner && (
          <div className=' absolute right-0'>
            <div className=' relative'>
              <HiOutlineDotsVertical
                className=' cursor-pointer'
                onClick={() => setEditable((prevState) => ({
                  ...prevState,
                  isOpen: !prevState.isOpen
                }))}
              />

              {editable.isOpen && (
                <div className=' w-[100px] bg-[#212121] border border-gray-600 rounded-lg absolute top-3 right-5 py-1.5 text-center'>
                  <p
                    className=' w-full border-b border-gray-600 pb-1.5 cursor-pointer hover:opacity-70'
                    onClick={() => setEditable(prevState => ({
                      ...prevState,
                      isOpen: false,
                      editing: !prevState.editing
                    }))}
                  >Edit</p>
                  <p
                    className=' pt-1.5 cursor-pointer hover:opacity-70'
                    onClick={() => setEditable(prevState => ({
                      ...prevState,
                      isOpen: false,
                      delete: !prevState.delete
                    }))}
                  >Delete</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete confirmation pop up  */}
        {editable.delete && (
          <DeleteConfirmation
            onDelete={handelDeleteComment}
            onCancel={() => setEditable(prevState => ({
              ...prevState,
              isOpen: false,
              delete: false,
            }))}
            comment={true}
          />
        )}

        {/* Edit popup */}
        {editable.editing ? (
          <Edit
            initialContent={editable.editedContent}
            onSave={handelEditComment}
            onCancel={() => setEditable(prevState => ({
              ...prevState,
              editing: false,
              isOpen: false
            }))}
          />) : (
          editable.editedContent
        )}

        <Like
          isLiked={isLiked}
          likesCount={likeCount}
          commentId={commentId}
          size={18}
        />
      </div>
    </div>
  )
}

export default CommentList