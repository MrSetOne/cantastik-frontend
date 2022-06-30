import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    needSignUp: false,
};

export const interfacesSlice = createSlice({
    name: "interfaces",
    initialState,
    reducers: {
        changeNeedSignUp: (state) => {
            state.needSignUp = !state.needSignUp
        },
    },
    extraReducers: (builder) => {

    },
});
export const { changeNeedSignUp } = interfacesSlice.actions;

export default interfacesSlice.reducer;