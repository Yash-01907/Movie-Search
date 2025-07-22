import { configureStore } from "@reduxjs/toolkit";
import movieDataReducer from "../slice/movieDataSlice";
import authReducer from "../slice/authSlice";

const store = configureStore({
 reducer:{movieData: movieDataReducer, auth: authReducer}
})

export default store;