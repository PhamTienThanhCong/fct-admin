import { createSlice } from "@reduxjs/toolkit";
import { chatState } from "../../types/chat/chat";
import { createChat, deleteChat, getChat, updateChat } from "./api";




const initialState: chatState = {
    listchat: [],
    isFetching: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    deleteChatR: (state, action) => {
        state.listchat = state.listchat.filter((chat) => chat.tag !== action.payload.tag);
        },
  },
  extraReducers: (builder) => {
    builder.addCase(getChat.fulfilled, (state, action) => {
        state.listchat = action.payload.intents;
        state.isFetching = true;
    })
    // create
    builder.addCase(createChat.fulfilled, (state, action) => {
        state.listchat = [...state.listchat, action.payload];
    })
    // update
    builder.addCase(updateChat.fulfilled, (state, action) => {
        state.listchat = state.listchat.map((chat) => {
            if (chat.tag === action.payload.tag) {
                return action.payload;
            }
            return chat;
        })
    })
    // delete
    builder.addCase(deleteChat.fulfilled, (state, action) => {

    })

  },
});

export const { deleteChatR } = chatSlice.actions;
export default chatSlice.reducer;
