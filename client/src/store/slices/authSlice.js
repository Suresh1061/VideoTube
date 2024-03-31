import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { errorHandler } from "../../constants";

const initialState = {
    loading: false,
    status: false,
    userData: null,
    token: null,
    history: [],
}


export const createAccount = createAsyncThunk('register', async (data) => {
    const formData = new FormData();
    formData.append('username', data.username)
    formData.append('fullName', data.fullName)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('avatar', data.avatar[0])
    if (data.coverImage) {
        formData.append('coverImage', data.coverImage[0])
    }

    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/users/register`, formData)
        message.success("Registered successfully")
        return res.data
    } catch (error) {
        const extractedErrorMessage = errorHandler(error?.response?.data)
        message.error(extractedErrorMessage)
        throw error
    }
})

export const userLogin = createAsyncThunk('login', async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/users/login`, data)
        return res.data.data
    } catch (error) {
        const extractedErrorMessage = errorHandler(error?.response?.data)
        message.error(extractedErrorMessage)
        throw error
    }
})

export const userLogout = createAsyncThunk('logout', async () => {
    try {
        await axios.post(`${import.meta.env.VITE_SERVER}/users/logout`)
        message.success("Log out successfully")
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw error
    }
})

export const refreshAccessToken = createAsyncThunk('refresh-token', async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/users/refresh-token`, data)
        return res.data;
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw error
    }
})

export const changePassword = createAsyncThunk('change-password', async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/users/change-password`, data)
        message.success("Password change successfully")
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw error
    }
})

export const getCurrentUser = createAsyncThunk('getCurrentUser', async (accessToken) => {
    axios.defaults.headers.common['Authorization'] = accessToken;
    const res = await axios.get(`${import.meta.env.VITE_SERVER}/users/current-user`)
    return res.data.data
})

export const updateAccountDetails = createAsyncThunk('updateAccountDetails', async (data) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/users/update-account`, data)
        message.success("Account details update successfully")
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw err
    }
})

export const updateAvatar = createAsyncThunk('updateAvatar', async (avatar) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/users/avatar`, avatar)
        message.success("Avatar update successfully")
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw err
    }
})

export const updateCoverImage = createAsyncThunk('updateCoverImage', async (coverImage) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_SERVER}/users/cover-image`, coverImage)
        message.success("Cover Image update successfully")
        return res.data.data
    } catch (error) {
        message.error(errorHandler(error?.response?.data))
        throw err
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.status = true
            state.userData = action.payload.user
            state.token = action.payload.accessToken
        })
        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false
            state.status = false
            state.userData = null
            state.token = null
        })
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false
            state.status = true
            state.userData = action.payload
        })
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false
            state.status = false
            state.userData = null
        })
        builder.addCase(updateAccountDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateAccountDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload
        })
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload
        })
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(updateCoverImage.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCoverImage.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload
        })
        builder.addCase(updateCoverImage.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default authSlice.reducer;