import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import { api } from './api/api.js';
import othersSlice from './reducers/others.js';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [othersSlice.name]: othersSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
