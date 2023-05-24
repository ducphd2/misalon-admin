import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const initialState = {
  isLoading: false,
  conversation: [],
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    resetConversation: (state) => {
      state.conversation = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addNewMessage: (state, action) => {
      let checkExist = false;
      let newState = state.conversation.slice() as any;
      newState = newState.map((i: any) => {
        if (!i._id) {
          checkExist = true;
          return action.payload;
        }
        return i;
      });
      if (!checkExist)
        state.conversation = [...state.conversation,action.payload as never];
      else {
        state.conversation = newState;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setConversation,
  addNewMessage,
  resetConversation,
} = conversationSlice.actions;
export const selectConversation = (state: RootState) =>
  state.conversation.conversation;
export default conversationSlice.reducer;
