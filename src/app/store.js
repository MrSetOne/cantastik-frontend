import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import auth from "../features/auth/authSlice";
import interfaces from "../features/interface/interfacesSlice"


export const store = configureStore({
    reducer: {
        auth,
        interfaces,
    },
});