import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../constants";
import { message } from "antd";
import axios from "axios";


const initialState = {
    loading: false,
    profileDetails: null,
    history: [],
}

export const UserChannel = createAsyncThunk("getUserChannel", async (username) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/users/c/${username}`)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw err
    }
})

export const getUserWatchHistory = createAsyncThunk("getUserWatchHistory", async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/users/watch-history`)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw err
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(UserChannel.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(UserChannel.fulfilled, (state, action) => {
            state.loading = false;
            state.profileDetails = action.payload
        })
        builder.addCase(getUserWatchHistory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.history = action.payload
        })
    }
})

export default userSlice.reducer