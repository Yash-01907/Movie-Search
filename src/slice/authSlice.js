import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userLoggedIn: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.userLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.userLoggedIn = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
