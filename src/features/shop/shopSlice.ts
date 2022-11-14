import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { ShopItemSchema } from "../../data/schema";

export interface shopState {
  items: ShopItemSchema[];
  lastRestock: number;
}

export const loadShop = createAsyncThunk(
  "monsters/loadShop",
  async (_, api) => {
    console.debug("load shop");
    const storage = await createStorage();
    const state = await storage.get("shop");
    if (!state) {
      console.warn("no saved shop data");
      return api.rejectWithValue(null);
    }
    return state;
  }
);

export const saveShop = createAsyncThunk<void, void, { state: RootState }>(
  "missions/saveShop",
  async (_, api) => {
    console.debug("save shop");
    const storage = await createStorage();
    await storage.set("shop", api.getState().shop);
  }
);

const initialState: shopState = {
  items: [],
  lastRestock: 0,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    restock: (state) => {
      state.lastRestock = new Date().getTime();
      const defaultItems =
        require("../../data/seed/shop.json") as ShopItemSchema[];
      // clone
      state.items = defaultItems.map(({ name, quantity, price }) => ({
        name,
        quantity,
        price,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadShop.fulfilled,
      (state, action: PayloadAction<shopState>) => {
        state.items.push(...action.payload.items);
        state.lastRestock = action.payload.lastRestock;
      }
    );
  },
});

export const { restock } = shopSlice.actions;

export const selectItems = (state: RootState) => state.shop.items;

export default shopSlice.reducer;
