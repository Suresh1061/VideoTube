import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../constants";
import { message } from "antd";
import axios from "axios";

const initialState = {
    loading: false,
    isSubscribed: null,
    channelSubscribers: [],
    subscribedChannels: []
}

export const toggleSubscription = createAsyncThunk("toggleSubscription", async (channelId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/subscription/c/${channelId}`);
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const channelSubscribers = createAsyncThunk("channelSubscribers", async (channelId) => {
    // console.log(channelId)
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/subscription/c/${channelId}`);
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const getSubscribedChannel = createAsyncThunk("getSubscribedChannel", async (subscriberId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/subscription/u/${subscriberId}`);
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.fulfilled, (state, action) => {
            state.loading = false;
            state.isSubscribed = action.payload.subscribed
        })
        builder.addCase(channelSubscribers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(channelSubscribers.fulfilled, (state, action) => {
            state.loading = false;
            state.channelSubscribers = action.payload;
        })
        builder.addCase(getSubscribedChannel.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getSubscribedChannel.fulfilled, (state, action) => {
            state.loading = false;
            // state.subscribedChannels = action.payload
            state.subscribedChannels = action.payload.filter(
                (subscription) => subscription?.subscribedChannel?.latestVideo
            );
        })
    }
})

export default subscriptionSlice.reducer