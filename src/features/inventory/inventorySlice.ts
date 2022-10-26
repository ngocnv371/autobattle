import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Item {
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
    add: (state, action: PayloadAction<Item>) => {
      const item = state.items.find((i) => i.name === action.payload.name);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { add } = inventorySlice.actions;

export const selectItems = (state: RootState) => state.inventory.items;

export default inventorySlice.reducer;
