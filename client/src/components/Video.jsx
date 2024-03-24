import React from 'react'

const Video = ({ src, poster }) => {
    return (
        <section className=' pt-24'>
            <video
                src={src}
                poster={poster}
                controls
                playsInline
                className="sm:h-[68vh] sm:max-w-4xl h-64 w-full object-contain rounded-lg overflow-hidden shadow-lg  border border-gray-600"
            ></video>
        </section>

    )
}

export default Video
