import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { thunk } from "redux-thunk";

import storage from "redux-persist/lib/storage";

import userSlice from "./slices/userSlice";
import searchSlice from "./slices/searchSlice";
import detailSlice from "./slices/detailSlice";


const reducers = combineReducers({
    user: userSlice,
    search: searchSlice,
    detail: detailSlice
});

const persistConfig = {
    key: "root",
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'saltamontes',
            onError: function (error) {
                // Handle the error.
            },
        }),
    ],
};


const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});