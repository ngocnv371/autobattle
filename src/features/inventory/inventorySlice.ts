import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Item } from "../../app/models";
import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { mergeItems } from "./utils";

export const loadInventory = createAsyncThunk(
  "inventory/loadInventory",
  async (_, api) => {
    console.debug("load inventory");
    const storage = await createStorage();
    const data = await storage.get("inventory");
    if (!data) {
      console.warn("no saved inventory");
      return api.rejectWithValue(null);
    }
    return data;
  }
);

export const saveInventory = createAsyncThunk<void, void, { state: RootState }>(
  "inventory/saveInventory",
  async (_, api) => {
    console.debug("save inventory");
    const storage = await createStorage();
    await storage.set("inventory", api.getState().inventory);
  }
);

export interface inventoryState {
  items: Item[];
}

const initialState: inventoryState = {
  items: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Item[]>) => {
      state.items = mergeItems(state.items, action.payload);
    },
    sell: (state, action: PayloadAction<Item>) => {
      // HACK: sell all items for 10 gold each
      const removed = state.items.filter((i) => i.name !== action.payload.name);
      state.items = mergeItems(removed, [
        { name: "Gold", quantity: 10 * action.payload.quantity },
      ]);
    },
    remove: (state, action: PayloadAction<Item[]>) => {
      state.items = state.items
        .map((i) => {
          const d = action.payload.find((p) => p.name === i.name);
          if (!d) {
            return i;
          }
          const item = { ...i, quantity: i.quantity - d?.quantity };

          return item;
        })
        .filter((p) => p.quantity > 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadInventory.fulfilled,
      (state, action: PayloadAction<inventoryState>) => {
        state.items.push(...action.payload.items);
      }
    );
  },
});

export const { add, sell, remove } = inventorySlice.actions;

export const selectItems = (state: RootState) => state.inventory.items;

export const selectInStock = (items: Item[]) => (state: RootState) =>
  items.filter((i) =>
    state.inventory.items.find(
      (k) => k.name === i.name && k.quantity >= i.quantity
    )
  ).length === items.length;

export default inventorySlice.reducer;
