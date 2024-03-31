import React from "react";
import { FaPlayCircle } from "./icons";

const NoVideosFound = ({
    text,
    className = "h-screen"
}) => {
    return (
        <div className={`w-full flex flex-col justify-center items-center ${className} `}>
            <FaPlayCircle
                size={45}
                className="text-purple-500"
            />
            <p className="mt-4 text-lg">There are no videos available here.</p>
            <p className="">{text && text}</p>
        </div>
    );
};

export default NoVideosFound;
