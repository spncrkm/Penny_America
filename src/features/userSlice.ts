import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../interface/Users";

const storedUser = sessionStorage.getItem('user');
const initialState: UserState = {
    user: {
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    },
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
        
        loginUser: (state, action: PayloadAction<{username: string, password: string}>) => {
            if (state.isLoggedIn === false && action.payload.username !== '' && action.payload.password !== '') {
                state.isLoggedIn = true;
                state.user.username = action.payload.username;
                state.user.password = action.payload.password;
                localStorage.setItem('username', state.user.username)
                localStorage.getItem('access')
                localStorage.getItem('refresh')
                localStorage.setItem('logged', JSON.stringify(state.isLoggedIn))
                console.log("login successful!")
            }
        },
        
        logoutUser: (state) => {
            state.user = initialState.user
            state.isLoggedIn = false;
            localStorage.removeItem('user')
            localStorage.removeItem('logged')
        }
    }
})

export const { addUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer