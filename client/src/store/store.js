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

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const store = configureStore({
    reducer: {
        auth: persistReducer(persistConfig, authSlice),
        user: userSlice,
        video: videoSlice,
        // video: persistReducer(persistConfig, videoSlice),
        comment: commentSlice,
        like: likeSlice,
        tweet: tweetSlice,
        playlist: playlistSlice,
        dashboard: dashboardSlice,
        subscription: subscriptionSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['some.path.to.ignore'],
            },
        }),
})

const persistedStore = persistStore(store)

export { store, persistedStore };