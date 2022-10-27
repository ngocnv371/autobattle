import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { mergeItems } from "./utils";

export interface Item {
  name: string;
  quantity: number;
}

const defaultItems: Item[] = [
  { name: "Branch", quantity: 3 },
  { name: "Torn Coat", quantity: 1 },
];

export interface inventoryState {
  items: Item[];
}

const initialState: inventoryState = {
  items: defaultItems,
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
  },
});

export const { add, sell } = inventorySlice.actions;

export const selectItems = (state: RootState) => state.inventory.items;

export default inventorySlice.reducer;
