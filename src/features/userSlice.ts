import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../interface/Users";

const storedUser = sessionStorage.getItem('user');
const initialState: UserState = {
    user: storedUser ? JSON.parse(storedUser) : []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = [action.payload]
            sessionStorage.setItem('user', JSON.stringify(state.user))
        },

        deleteUser: (state, action: PayloadAction<number>) => {
            state.user = state.user.filter(userId => userId.id !== action.payload)
            sessionStorage.setItem('user', JSON.stringify(state.user))
        },
        
        logout: (state, action) => {
            
        }
    }
})

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer