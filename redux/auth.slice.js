import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isExistingUser: false,
    existingUserCredentials: null,
};

export const authSlice = createSlice({
    name: "ExistingUser",
    initialState,
    reducers: {
        SIGNUP: (state, action) => {
            if (action?.payload) {
                state.isExistingUser = action?.payload?.loggedInUser?.isLogedIn;
                state.existingUserCredentials =
                action?.payload?.loggedInUser?.credentials;
                return state;
            }
        },

        SIGNIN: (state, action) => {
            if (action?.payload) {
                state.isExistingUser = action?.payload?.loggedInUser?.isLogedIn;
                state.existingUserCredentials =
                action?.payload?.loggedInUser?.credentials;
                return state;
            }
        },

        LOGOUT: (state) => {
            state.existingUserCredentials = null,
            state.isExistingUser = false;
            return state;
        }
    },
});

// Action creators are generated for each case reducer function
export const {SIGNUP, SIGNIN, LOGOUT} = authSlice.actions;

export default authSlice.reducer;