import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

type FormState = {
  isSignUpForm: boolean;
};

const initialState: FormState = {
  isSignUpForm: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.isSignUpForm = !state.isSignUpForm;
    },
    resetForm: (state) => {
      state.isSignUpForm = false;
    },
  },
});

export const { toggleForm, resetForm } = formSlice.actions;
export const selectDialogIsSignUpForm = (state: RootState) =>
  state.form.isSignUpForm;
export default formSlice.reducer;
