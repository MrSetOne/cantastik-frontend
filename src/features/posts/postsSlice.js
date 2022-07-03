import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    isLoading: false
};

export const getPosts = createAsyncThunk("post/GetPosts", async(token, thunkAPI) => {
    try {
        return await postsService.getPosts(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const like = createAsyncThunk("post/Like", async(post, thunkAPI) => {
    try {
        return await postsService.doALike(post)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const unlike = createAsyncThunk("post/unlikek", async(post, thunkAPI) => {
    try {
        return postsService.doAnUnlike(post)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // reset: (state) => {
        //   state.isError = false;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.isLoading = false;
            })
            // .addCase(register.rejected, (state, action) => {
            //     state.isError = true;
            //     state.message = action.payload;
            // })
    },
});
// export const { reset } = authSlice.actions;

export default postsSlice.reducer;