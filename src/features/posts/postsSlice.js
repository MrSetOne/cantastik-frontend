import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    isLoading: false,
    post: {}
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

export const getPostsByAuthor = createAsyncThunk('post/getByAuthor', async(id, thunkAPI) => {
    try {
        return await postsService.getPostsByAuthor(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createPost = createAsyncThunk('post/createPost', async(data, thunkAPI) => {
    try {
        return await postsService.createPost(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getPostById = createAsyncThunk('post/getPostById', async(id, thunkAPI) => {
    try {
        return await postsService.getPostById(id)
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
                console.log(action.payload)
                if (action.meta.arg.i) {
                    state.posts[action.meta.arg.i].likes.push({ _id: action.payload.user._id, username: action.payload.user.username, img: action.payload.user.img })
                } else {
                    state.post.likes.push({ _id: action.payload.user._id, username: action.payload.user.username, img: action.payload.user.img })
                }
            })
            .addCase(unlike.fulfilled, (state, action) => {
                if (action.meta.arg.i) {
                    state.posts[action.meta.arg.i].likes = state.posts[action.meta.arg.i].likes.filter(item => item._id !== action.payload.user)
                } else {
                    state.post.likes = state.post.likes.filter(item => item._id !== action.payload.user)
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                action.payload.newComment.author = action.payload.author
                if (action.meta.arg.i) {
                    state.posts[action.meta.arg.i].comments.push(action.payload.newComment)
                } else {
                    state.post.comments.push(action.payload.newComment)
                }
            })
            .addCase(getPostsByAuthor.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [action.payload.newPost, ...state.posts]
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.post = action.payload
            })
    },
});
// export const { reset } = authSlice.actions;

export default postsSlice.reducer;