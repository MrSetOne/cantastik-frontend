import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
    isLoading: false,
    isConfirmed: false,
    isError: false,
    isSuccess: false,
    message: "",
    loads: {
        follow: false
    }
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
        return await authService.newInfo()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const signup = createAsyncThunk("auth/register", async(user, thunkAPI) => {
    try {
        return await authService.signup(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async(thunkAPI) => {
    try {
        return await authService.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk("auth/update", async(data, thunkAPI) => {
    try {
        return await authService.updateUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const doAFollow = createAsyncThunk('atuth/doAFollow', async(target, thunkAPI) => {
    try {
        return await authService.doAFollow(target)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const doAnUnfollow = createAsyncThunk('auth/doAnUnfollow', async(target, thunkAPI) => {
    try {
        return await authService.doAnUnfollow(target)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verify = createAsyncThunk('auth/verify', async(token, thunkAPI) => {
    try {
        return await authService.verify(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const wellcomeEnd = createAsyncThunk('auth/wellcomeEnd', async(thunkAPI) => {
    try {
        return await authService.wellcomeEnd()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addLike: (state, action) => {
            state.user.likedPosts.push(action.payload)
        },
        removeLike: (state, action) => {
            state.user.likedPosts = state.user.likedPosts.filter(post => post !== action.payload)
        },
        resetNotif: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.message = `${action.payload.newUser.username}, solo te queda verificar tu correo: ${action.payload.newUser.email}, `
            })
            .addCase(signup.rejected, (state, action) => {
                console.log(action)
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.loggedUser;
                state.token = action.payload.token
                state.isLoading = false;

            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;

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
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user.username = action.payload.updatedUser.username;
                state.user.img = action.payload.updatedUser.img;
                state.user.bio = action.payload.updatedUser.bio;
            })
            .addCase(doAFollow.pending, (state, action) => {
                state.loads.follow = true
            })
            .addCase(doAFollow.fulfilled, (state, action) => {
                state.user.following = action.payload.follower.following
                state.loads.follow = false
            })
            .addCase(doAnUnfollow.pending, (state, action) => {
                state.loads.follow = true
            })
            .addCase(doAnUnfollow.fulfilled, (state, action) => {
                state.user.following = action.payload.unfollower.following
                state.loads.follow = false
            })
            .addCase(verify.fulfilled, (state) => {
                state.isConfirmed = true
            })
            .addCase(wellcomeEnd.fulfilled, (state, action) => {
                state.user = action.payload.updatedUser
            })
    },
});
export const { addLike, removeLike, resetNotif } = authSlice.actions;

export default authSlice.reducer;