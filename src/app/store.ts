import { configureStore } from "@reduxjs/toolkit";
import battleReducer from '../features/battle/battleSlice';
import barrackReducer from '../features/barrack/barrackSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import tavernReducer from '../features/tavern/tavernSlice';
import monstersReducer from '../features/monsters/monstersSlice';
import missionsReducer from '../features/missions/missionsSlice';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    barrack: barrackReducer,
    inventory: inventoryReducer,
    tavern: tavernReducer,
    monsters: monstersReducer,
    missions: missionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
