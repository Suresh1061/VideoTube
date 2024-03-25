import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, errorHandler } from "../../constants";
import { message } from "antd";
import axios from "axios";


const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false,
    },
    video: null,
    isPublished: true
}

export const getAllVideos = createAsyncThunk(
    "getAllVideos", async ({ userId, query, sortBy, sortType, page, limit }) => {
        try {
            const url = new URL(`${import.meta.env.VITE_SERVER}/videos`)

            if (userId) url.searchParams.set("userId", userId);
            if (query) url.searchParams.set("query", query);
            if (page) url.searchParams.set("page", page);
            if (limit) url.searchParams.set("limit", limit);
            if (sortBy && sortType) {
                url.searchParams.set("sortBy", sortBy);
                url.searchParams.set("sortType", sortType);
            }
            const res = await axios.get(url)
            return res.data.data
        } catch (error) {
            // message.error(errorHandler(error?.response?.data))
            throw error
        }
    })

export const uploadVideo = createAsyncThunk("uploadVideo", async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('thumbnail', data.thumbnail[0])
    formData.append('videoFile', data.videoFile[0])

    // console.log(formData)
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/videos`, formData)
        message.success(res.data?.message)
        // console.log(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const findVideo = createAsyncThunk("findVideo", async ({ videoId }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/videos/${videoId}`)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const updateVideoDetails = createAsyncThunk(
    "updateAVideo",
    async ({ videoId, data }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("thumbnail", data.thumbnail[0]);

        // console.log(videoId, formData)

        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_SERVER}/videos/${videoId}`,
                formData
            );
            return response.data.data;
        } catch (error) {
            message.error(errorHandler(error?.response?.data))
            throw error;
        }
    }
);

export const deleteVideo = createAsyncThunk("deleteVideo", async (videoId) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_SERVER}/videos/${videoId}`)
        message.success(res.data?.message)
        return res.data.data;
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const toggleIsPublish = createAsyncThunk("toggleIsPublish", async (videoId) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/videos/toggle/publish/${videoId}`)
        // message.success("successfully published")
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) => {
            state.videos.docs = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.docs = action.payload.docs
            state.videos.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(uploadVideo.pending, (state) => {
            state.uploading = true;
        })
        builder.addCase(uploadVideo.fulfilled, (state, action) => {
            state.uploading = false;
            state.uploaded = true;
        })
        builder.addCase(updateVideoDetails.pending, (state) => {
            state.uploading = true;
        })
        builder.addCase(updateVideoDetails.fulfilled, (state, action) => {
            console.log(action)
            state.uploading = false;
            state.uploaded = true;
        })
        builder.addCase(deleteVideo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(findVideo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(findVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload
        })
        builder.addCase(toggleIsPublish.fulfilled, (state) => {
            state.isPublished = !state.isPublished
        })
    }
})

export const { updateUploadState, makeVideosNull } = videoSlice.actions;
export default videoSlice.reducer