import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    authorPosts: [],
    isLoading: false,
    post: {},
    countTotalPosts: 0,
    loads: {
        home: true,
        postDetail: true
    }
};

export const getPosts = createAsyncThunk("post/GetPosts", async(page, thunkAPI) => {
    try {
        if (!page) {
            page = 1
        }
        console.log(`Solicitamos la pagina ${page}`)
        return await postsService.getPosts(page)
    } catch (error) {
        console.log(error)
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

export const unlike = createAsyncThunk("post/unlike", async(post, thunkAPI) => {
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

export const findByTitle = createAsyncThunk('post/findByTitle', async(search, thunkAPI) => {
    try {
        return await postsService.findByTitle(search)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async(info, thunkAPI) => {
    try {
        return await postsService.updatePost(info)
    } catch (error) {
        console.log(error)
    }
})

export const deletePost = createAsyncThunk('post/deletePost', async(_id, thunkAPI) => {
    try {
        return await postsService.deletePost(_id)
    } catch (error) {
        console.log(error)
    }
})

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loads.home = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                if (!action.meta.arg) {
                    state.posts = action.payload.allPosts
                }
                if (action.meta.arg) {
                    state.posts = [...state.posts, ...action.payload.allPosts]
                }
                state.countTotalPosts = action.payload.count
                state.currentPage = state.currentPage + 1
                state.loads.home = false;
            })
            .addCase(like.fulfilled, (state, action) => {
                if (action.meta.arg.authorPost) {
                    state.authorPosts[action.meta.arg.i].likes.push({ _id: action.payload.user._id, username: action.payload.user.username, img: action.payload.user.img })
                } else if (!action.meta.arg.i && action.meta.arg.i !== 0) {
                    state.post.likes.push({ _id: action.payload.user._id, username: action.payload.user.username, img: action.payload.user.img })

                } else {
                    state.posts[action.meta.arg.i].likes.push({ _id: action.payload.user._id, username: action.payload.user.username, img: action.payload.user.img })
                }
            })
            .addCase(unlike.fulfilled, (state, action) => {
                if (action.meta.arg.authorPost) {
                    state.authorPosts[action.meta.arg.i].likes = state.authorPosts[action.meta.arg.i].likes.filter(item => item._id !== action.payload.user)
                } else if (!action.meta.arg.i && action.meta.arg.i !== 0) {
                    state.post.likes = state.post.likes.filter(item => item._id !== action.payload.user)
                } else {
                    state.posts[action.meta.arg.i].likes = state.posts[action.meta.arg.i].likes.filter(item => item._id !== action.payload.user)
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                action.payload.newComment.author = action.payload.author
                if (action.meta.arg.authorPost) {
                    console.log('estoy aqui')
                    state.authorPosts[action.meta.arg.i].comments.push(action.payload.newComment)
                } else if (!action.meta.arg.i && action.meta.arg.i !== 0) {
                    state.post.comments.push(action.payload.newComment)
                } else {
                    state.posts[action.meta.arg.i].comments.push(action.payload.newComment)
                }
            })
            .addCase(getPostsByAuthor.fulfilled, (state, action) => {
                state.authorPosts = action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [action.payload.newPost, ...state.posts]
            })
            .addCase(getPostById.pending, (state) => {
                state.loads.postDetail = true
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.post = action.payload
                state.loads.postDetail = false
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.loads.postDetail = false
            })
            .addCase(findByTitle.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.post = action.payload.updatedPost
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.post = {}
            })
    },
});
// export const { reset } = authSlice.actions;

export default postsSlice.reducer;