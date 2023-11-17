import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices";
import { CommentState } from "../../types/comment/comment";
import { createComment, getComment } from "./api";


export const getlistCommentAsync = createAsyncThunk<any, { station_id: number}>(
  "comment/getComment",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const { keyword } = thunkAPI.getState().stationPorts;
      console.log("Keyword in getListPortsTypeAsync:", keyword);
      const params = keyword ? { keyword: encodeURIComponent(keyword) } : {};
      const response = await getComment(payload.station_id, params); 
      return response.data;
    } catch (error) {
      console.error("Error in getListPortsTypeAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);

export const createCommentAsync = createAsyncThunk<any, any>(
	"comment/create",
	async (payload: any, thunkAPI: any) => {
	  try {
		thunkAPI.dispatch(toggleLoadingStatus());
		const response = await createComment(payload);
		thunkAPI.dispatch(toggleLoadingStatus());
		return response
	  } catch (error) {
		console.error("Error in createCarTypeAsync:", error);
		throw error;
	  }
	}
);

const initialState: CommentState = {
  listComment: [],
  keyword: ''
};

export const orderSlice = createSlice({
	name:'order',
	initialState,
	reducers:{
    toggleSetKeyword: (state, action) => {
      state.keyword = action.payload || "";
      state.listComment = [];
    },
  },
	extraReducers:(builder) => {
    builder
    .addCase(getlistCommentAsync.fulfilled,(state,action)=>{
      const resData = action.payload;
      const {keyword } = state;

      if(Array.isArray(resData)){
        state.listComment = resData.filter((order :{name:string})=>
          order.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }else{
        state.listComment = [resData]
      }
    })
    .addCase(createCommentAsync.fulfilled,(state,action)=>{
      state.listComment = [...state.listComment, action.payload]
    })
  }
})

export const {toggleSetKeyword } = orderSlice.actions
export default orderSlice.reducer