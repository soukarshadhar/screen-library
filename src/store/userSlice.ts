import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type User = {
  displayName: string;
  uid: string;
  email: string;
};

type UserState = User | null;

const initialState: UserState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) =>
      action.payload,
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState): UserState => state.user;
export default userSlice.reducer;
