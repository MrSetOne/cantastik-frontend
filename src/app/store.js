import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import auth from "../features/auth/authSlice";
import interfaces from "../features/interface/interfacesSlice"
import posts from "../features/posts/postsSlice"
import users from "../features/users/usersSlice"


export const store = configureStore({
    reducer: {
        auth,
        interfaces,
        posts,
        users
    },
});