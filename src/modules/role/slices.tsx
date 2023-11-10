import { createSlice } from '@reduxjs/toolkit'
import { createRole, deleteRole, getRole, updateRole } from './api'
import { RoleSlice } from '../../types/roles'


const initialState : RoleSlice = {
  Roles: [],
  isFetching: false
}

export const roleSlice = createSlice({
	name: 'role',
	initialState,
	reducers:{
        removeRole: (state, action)=>{
            state.Roles = state.Roles.filter((role)=>role.id !== action.payload.id)
        }
    },
	extraReducers:(builder)=>{
        builder.addCase(getRole.fulfilled, (state, action)=>{
            state.isFetching = true;
            state.Roles = action.payload;
        })
        builder.addCase(createRole.fulfilled, (state, action)=>{
            state.Roles = [...state.Roles, action.payload]
        })
        builder.addCase(updateRole.fulfilled, (state, action)=>{
            state.Roles = state.Roles.map((role)=>{
                if(role.id === action.payload.id){
                    return action.payload
                }
                return role
            })
        })
        builder.addCase(deleteRole.fulfilled, (state, action)=>{
            
        })
    }
})

export const { removeRole } = roleSlice.actions
export default roleSlice.reducer