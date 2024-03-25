import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../constants";
import { message } from "antd";
import axios from "axios";

const initialState = {
    loading: false,
    playlist: []
}

export const createPlaylist = createAsyncThunk("createPlaylist", async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/playlists`, data);
        message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const updatePlaylist = createAsyncThunk("updatePlaylist", async (data) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/playlists/${data.playlistId}`, data);
        message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const deletePlaylist = createAsyncThunk("deletePlaylist", async (playlistId) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_SERVER}/playlists/${playlistId}`);
        message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const addVideoToPlaylist = createAsyncThunk("addVideo", async ({ playlistId, videoId }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/playlists/add/${playlistId}/${videoId}`);
        message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const removeVideoFromPlaylist = createAsyncThunk("removeVideo", async ({ playlistId, videoId }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/playlists/remove/${playlistId}/${videoId}`);
        message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const findPlaylistByUserId = createAsyncThunk("findPlaylistByUserId", async (userId) => {

    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/playlists/user/${userId}`);
        // message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

export const findPlaylistByPlaylistId = createAsyncThunk("findPlaylistByPlaylistId", async (playlistId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/playlists/${playlistId}`);
        message.success(res.data.data)
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
    }
})

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(findPlaylistByUserId.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(findPlaylistByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload
        })
        builder.addCase(findPlaylistByPlaylistId.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(findPlaylistByPlaylistId.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload
        })
    }
})

export default playlistSlice.reducer