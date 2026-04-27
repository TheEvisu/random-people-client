import { configureStore } from '@reduxjs/toolkit';
import { randomUserApi } from './api/randomUserApi';
import { profilesApi } from './api/profilesApi';
import { healthApi } from './api/healthApi';
import profilesReducer from './slices/profilesSlice';

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    [randomUserApi.reducerPath]: randomUserApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
    [healthApi.reducerPath]: healthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      randomUserApi.middleware,
      profilesApi.middleware,
      healthApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
