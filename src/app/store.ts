import { configureStore } from "@reduxjs/toolkit";
import battleReducer from '../features/battle/battleSlice';
import atlasReducer from '../features/atlas/atlasSlice';
import barrackReducer from '../features/barrack/barrackSlice';
import inventoryReducer from '../features/inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    atlas: atlasReducer,
    barrack: barrackReducer,
    inventory: inventoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
