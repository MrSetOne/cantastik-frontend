import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './usersService'

const initialState = {
    userDisplayed: {},
    isLoading: false
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
            .addCase(getById.pending, (state) => { state.isLoading = true })

        .addCase(getById.fulfilled, (state, action) => {
            state.userDisplayed = action.payload.foundUser
            state.isLoading = false
        })

        .addCase(getById.rejected, (state, action) => { console.error("Se ha rejectado") })
    },
})

export default usersSlice.reducer