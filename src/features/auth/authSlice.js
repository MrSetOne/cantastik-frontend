import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
    isLoading: false,
    //   isError: false,
    //   isSuccess: false,
    //   message: "",
};


export const login = createAsyncThunk("auth/login", async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        // const message = error.response.data.message;
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const newInfo = createAsyncThunk('auth/newInfo', async(thunkAPI) => {
    try {
        // console.log('entra')
        return await authService.newInfo()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const signup = createAsyncThunk("auth/register", async(user, thunkAPI) => {
    try {
        // console.log(user)
        return await authService.signup(user);
    } catch (error) {
        console.log(error.response.data);
        // const message = error.response.data;
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async() => {
    try {
        return await authService.logout();
    } catch (error) {
        console.error(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addLike: (state, action) => {
            state.user.likedPosts.push(action.payload)
        },
        removeLike: (state, action) => {
            state.user.likedPosts = state.user.likedPosts.filter(post => post != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.loggedUser;
                state.token = action.payload.token
                state.isLoading = false;
                // state.isSuccess = true;
                // state.message = action.payload.message;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                // state.isError = true;
                // state.message = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isLoading = false;
            })
            .addCase(newInfo.fulfilled, (state, action) => {
                state.user = action.payload
            })
            //   .addCase(register.fulfilled, (state, action) => {
            //     state.isSuccess = true;
            //     state.message = action.payload.message;
            //   })
            //   .addCase(register.rejected, (state, action) => {
            //     state.isError = true;
            //     state.message = action.payload;
            //   })
    },
});
export const { addLike, removeLike } = authSlice.actions;

export default authSlice.reducer;