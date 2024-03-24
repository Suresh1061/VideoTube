import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleIsPublish } from '../store/slices/videoSlice'

function ToggleIsPublished({ videoId, isPublished }) {
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(!isPublished)

    const toggleIsPublishStatus = () => {
        dispatch(toggleIsPublish(videoId))
        setIsChecked((prev) => !prev)
    }

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={isChecked}
                    onChange={toggleIsPublishStatus} />
                <div className="toggle-switch"></div>
            </label>
        </div>
    )
}

export default ToggleIsPublished