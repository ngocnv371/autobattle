import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "../features/battle/battleSlice";
import barrackReducer from "../features/barrack/barrackSlice";
import inventoryReducer, {
  loadInventory,
  saveInventory,
} from "../features/inventory/inventorySlice";
import tavernReducer from "../features/tavern/tavernSlice";
import monstersReducer, {
  loadMonsters,
  saveMonsters,
} from "../features/monsters/monstersSlice";
import missionsReducer, {
  loadMissions,
  saveMissions,
} from "../features/missions/missionsSlice";
import shopReducer, { loadShop, saveShop } from "../features/shop/shopSlice";

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    barrack: barrackReducer,
    inventory: inventoryReducer,
    tavern: tavernReducer,
    monsters: monstersReducer,
    missions: missionsReducer,
    shop: shopReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export async function save() {
  console.info("save store data");
  await store.dispatch(saveMonsters());
  await store.dispatch(saveMissions());
  await store.dispatch(saveShop());
  await store.dispatch(saveInventory());
}

export async function load() {
  console.info("load store data");
  await store.dispatch(loadMonsters());
  await store.dispatch(loadMissions());
  await store.dispatch(loadShop());
  await store.dispatch(loadInventory());
}
