import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../interface/Users";

const storedUser = sessionStorage.getItem('user');
const initialState: UserState = {
    user: null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('logged', JSON.stringify(state.isLoggedIn))
        },

        deleteUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user')
            localStorage.removeItem('logged')
        },
        
        loginUser: (state, action: PayloadAction<{username: string, password: string }>) => {
            if (action.payload.username === state.user?.username && action.payload.password === state.user?.password) {
                state.user.username = action.payload.username;
                state.user.password = action.payload.password;
                state.isLoggedIn = true;
                localStorage.setItem('username', state.user.username)
                localStorage.getItem('access')
                localStorage.getItem('refresh')
                console.log("login successful!")
            } else {
                console.log("Could not log in:")
            }
        },
        
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user')
            localStorage.removeItem('logged')
        }
    }
})

export const { addUser, deleteUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer