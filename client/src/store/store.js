import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";
import commentSlice from "./slices/commentSlice";
import likeSlice from "./slices/likeSlice"
import tweetSlice from "./slices/tweetSlice"
import playlistSlice from "./slices/playlistSlice"
import dashboardSlice from "./slices/dashboardSlice"
import subscriptionSlice from "./slices/subscriptionSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        video: videoSlice,
        comment: commentSlice,
        like: likeSlice,
        tweet: tweetSlice,
        playlist: playlistSlice,
        dashboard: dashboardSlice,
        subscription: subscriptionSlice,
    }
})

export default store;