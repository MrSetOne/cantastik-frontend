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

export const addComment = createAsyncThunk("post/addComment", async(input, thunkAPI) => {
    try {
        return await postsService.addComment(input)
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
            .addCase(like.fulfilled, (state, action) => {
                state.posts[action.meta.arg.i].likes.push(action.payload.user)

            })
            .addCase(unlike.fulfilled, (state, action) => {
                state.posts[action.meta.arg.i].likes = state.posts[action.meta.arg.i].likes.filter(id => id !== action.payload.user)
            })
            .addCase(addComment.fulfilled, (state, action) => {
                action.payload.newComment.author = action.payload.author
                state.posts[action.meta.arg.i].comments.push(action.payload.newComment)
            })
            // .addCase(register.rejected, (state, action) => {
            //     state.isError = true;
            //     state.message = action.payload;
            // })
    },
});
// export const { reset } = authSlice.actions;

export default postsSlice.reducer;