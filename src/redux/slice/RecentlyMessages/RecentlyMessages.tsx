import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  recentlyMessages: [],
  error: null,
};

const recentlyMessagesSlice = createSlice({
  name: "recentlyMessages",
  initialState,
  reducers: {
    setRecentlyMessages: (state, action) => {
      state.recentlyMessages = action.payload;
    },
    resetRecentlyMessages: (state) => {
      state.recentlyMessages = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    concatRecentlyMessages: (state, action) => {
      state.recentlyMessages = [
        action.payload as never,
        ...state.recentlyMessages,
      ];
    },
  },
});

export const {
  setLoading,
  setError,
  setRecentlyMessages,
  concatRecentlyMessages,
  resetRecentlyMessages,
} = recentlyMessagesSlice.actions;
export const selectRecentlyMessages = (state: RootState) =>
  state.resetRecentlyMessages.recentlyMessages;
export default recentlyMessagesSlice.reducer;
