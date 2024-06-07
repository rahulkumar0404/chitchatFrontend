import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import { api } from './api/api.js';
import othersSlice from './reducers/others.js';
import fileSlice from './reducers/files.js';
import chatSlice from './reducers/chat.js';
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [othersSlice.name]: othersSlice.reducer,
    [fileSlice.name]: fileSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
