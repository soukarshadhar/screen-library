import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type DialogState = {
  isOpen: boolean;
};

const initialState: DialogState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleDialog: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleDialog } = dialogSlice.actions;
export const selectDialogIsOpen = (state: RootState) => state.dialog.isOpen;
export default dialogSlice.reducer;
