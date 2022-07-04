import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './usersService'

const initialState = {
    userDisplayed: {}
}

export const getById = createAsyncThunk('users/getById', async(id, thunkAPI) => {
    try {
        return await userService.getById(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.userDisplayed = action.payload.foundUser
            })
    },
})

export default usersSlice.reducer