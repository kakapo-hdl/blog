
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import HomeReducer from '../reducers/HomeReducers';
export const store = configureStore({
  reducer: {
    home: HomeReducer,
  },
  middleware: [thunk, logger],
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch