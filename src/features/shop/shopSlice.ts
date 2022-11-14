import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { ShopItemSchema } from "../../data/schema";
import { selectOneItem } from "../inventory/inventorySlice";

export const DEFAULT_CURRENCY = "Magic Stone";

export interface shopState {
  items: ShopItemSchema[];
  lastRestock: number;
  buyoutPriceModifier: number;
  junkPrice: number;
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
  buyoutPriceModifier: 0.5,
  junkPrice: 10,
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
        state.buyoutPriceModifier = action.payload.buyoutPriceModifier;
        state.junkPrice = action.payload.junkPrice;
      }
    );
  },
});

export const { restock } = shopSlice.actions;

export const selectItems = (state: RootState) => state.shop.items;

export const selectCanBuyQuantity =
  (name: string) =>
  (state: RootState): [min: number, max: number] => {
    const currency = selectOneItem(DEFAULT_CURRENCY)(state);
    if (!currency) {
      return [0, 0];
    }
    const item = state.shop.items.find((i) => i.name === name);
    if (!item) {
      throw new Error(`item not found: ${name}`);
    }
    const max = Math.floor(currency.quantity / item.price);
    const min = max > 0 ? 1 : 0;
    return [min, max];
  };

export const selectPrice =
  (name: string) =>
  (state: RootState): number => {
    const item = state.shop.items.find((i) => i.name === name);
    if (item) {
      return item.price * state.shop.buyoutPriceModifier;
    }
    return state.shop.junkPrice;
  };

export default shopSlice.reducer;
