import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../constants";
import { message } from "antd";
import axios from "axios";

const initialState = {
    loading: false,
    tweets: [],
}

export const createTweet = createAsyncThunk("createTweet", async (content) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/tweets`, content);
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const getUserTweet = createAsyncThunk("userTweet", async (userId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/tweets/user/${userId}`);
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const updateTweet = createAsyncThunk("updateTweet", async ({ content, tweetId }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/tweets/${tweetId}`, { content });
        message.success(res.data?.message)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_SERVER}/tweets/${tweetId}`);
        message.success(res.data?.message)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})


const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTweet.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createTweet.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets.unshift(action.payload)
        })
        builder.addCase(getUserTweet.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserTweet.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets = action.payload;
        })
        builder.addCase(updateTweet.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteTweet.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload.tweetId);
        })
    }
})

export default tweetSlice.reducer