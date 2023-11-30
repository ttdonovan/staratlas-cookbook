import { configureStore } from "@reduxjs/toolkit";

import playground from "./reducers";

const store = configureStore({
    reducer: playground,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;