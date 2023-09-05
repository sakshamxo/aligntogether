import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    blogs: null,
    isAuthenticated: false,
    error: null,
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        errors: (state, action) => {
            state.error = action.payload;
        },
        signout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        loadpost: (state, action) => {
            state.posts = action.payload;
        },
       
    },
});

// Action creators are generated for each case reducer function
export const { loaduser, errors, signout, loadpost } = userSlice.actions;

export default userSlice.reducer;