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
  { name: "Magic Stone", quantity: 132 },
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
