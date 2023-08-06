import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {noteSlice} from "./slice";

const rootReducer = combineReducers({
    noteSlice,
});

const setupStore = () => configureStore({
    reducer: rootReducer,

    devTools: true,
});

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppStore,
    AppDispatch,
};

export {
    setupStore,
};