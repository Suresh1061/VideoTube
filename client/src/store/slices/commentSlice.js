import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../constants";
import { message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constants";

const initialState = {
    loading: false,
    comments: [],
    totalComments: null,
    hasNextPage: false,
}

export const createComment = createAsyncThunk("createComment", async ({ videoId, content }) => {
    try {
        // console.log(content, videoId)
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/comments/${videoId}`, { content });
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const updateComment = createAsyncThunk("updateComment", async ({ content, commentId }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/comments/c/${commentId}`, { content });
        message.success(res.data?.message)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
    // console.log(commentId)
    try {
        const res = await axios.delete(`${import.meta.env.VITE_SERVER}/comments/c/${commentId}`);
        message.success(res.data?.message)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const getAllVideoComments = createAsyncThunk("allVideoComments", async ({ page, limit, videoId }) => {

    try {
        const url = new URL(`${import.meta.env.VITE_SERVER}/comments/${videoId}`);
        if (page) url.searchParams.set("page", page);
        if (limit) url.searchParams.set("limit", limit);
        // console.log(url)
        const res = await axios.get(url);
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        cleanUpComments: (state) => {
            state.comments = []
        }
    },
    extraReducers: (builder) => {

        builder.addCase(createComment.fulfilled, (state, action) => {
            state.comments.unshift(action.payload);
            state.totalComments++;
        })
        builder.addCase(getAllVideoComments.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllVideoComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = [...state.comments, ...action.payload.docs];
            state.totalComments = action.payload.totalDocs;
            state.hasNextPage = action.payload.hasNextPage;
        })
        builder.addCase(updateComment.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = state.comments.filter((comment) => comment._id !== action.payload.commentId)
            state.totalComments--;
        })
    }
})

export const { cleanUpComments } = commentSlice.actions;
export default commentSlice.reducer