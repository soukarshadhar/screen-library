import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

const initialState: boolean = true;

const appLoaderSlice = createSlice({
  name: "appLoader",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setLoading } = appLoaderSlice.actions;
export const selectCanShowAppLoader = (state: RootState) =>
  state.canShowAppLoader;
export default appLoaderSlice.reducer;
