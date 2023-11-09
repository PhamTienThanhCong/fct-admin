import { createSlice } from '@reduxjs/toolkit'
import { getRole } from './api'
import { RoleSlice } from '../../types/roles'


const initialState : RoleSlice = {
  Roles: [],
  isFetching: false
}

export const roleSlice = createSlice({
	name: 'role',
	initialState,
	reducers:{},
	extraReducers:(builder)=>{
        builder.addCase(getRole.fulfilled, (state, action)=>{
            state.isFetching = true;
            state.Roles = action.payload;
        })
    }
})

export default roleSlice.reducer