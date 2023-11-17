import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices"
import { createchat, deletechat, getchat, updatechat } from "./api";
import { chatState } from "../../types/chat/chat";


export const getListChatAsync = createAsyncThunk<any, any>(
  "chat/getchat",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const { keyword } = thunkAPI.getState().chat;
      console.log("Keyword in getListStationAsync:", keyword); 
      const params = keyword ? { keyword: encodeURIComponent(keyword) } : {};
      const response = await getchat({ ...payload, ...params });
      return response.data
    } catch (error) {
      console.error("Error in getListchatAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);

export const createChatAsync = createAsyncThunk<any, any>(
  "chat/create",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await createchat(payload);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response
    } catch (error) {
      console.error("Error in createchatAsync:", error);
      throw error;
    }
  }
);


export const updatechatAsync = createAsyncThunk<any, { tag: string, params: any }>(
  'chat/update',
  async ({ tag, params }, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await updatechat(tag, params);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


export const deleteChatAsync = createAsyncThunk<any, any>(
  "chat/delete",
  async (id: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await deletechat(id);
      return response
    } catch (error) {
      console.error("Error in deletechatAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);

const initialState: chatState = {
  listchat:[],
  keyword:''
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleSetKeyword: (state, action) => {
      state.keyword = action.payload || "";
      state.listchat = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getListChatAsync.fulfilled, (state, action) => {
      const responseData = action.payload;
      const { keyword } = state;
    
      if (Array.isArray(responseData)) {
        state.listchat = responseData.filter((carType: { tag: string }) => 
          carType.tag.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        state.listchat = [responseData];
      }
    })
    
    .addCase(createChatAsync.fulfilled, (state, action)=>{
			state.listchat = [...state.listchat, action.payload]
		})

    .addCase(updatechatAsync.fulfilled, (state, action) => {
      const updatedCarType = action.payload;
      const index = state.listchat.findIndex((carType) => carType.tag === updatedCarType.id);
    
      if (index !== -1) {
        state.listchat[index] = updatedCarType;
      }
    });
    
  },
});

export const { toggleSetKeyword } = chatSlice.actions;
export default chatSlice.reducer;
