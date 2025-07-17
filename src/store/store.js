import { configureStore } from "@reduxjs/toolkit";
import movieDataReducer from "../slice/movieDataSlice";

const store = configureStore({
 reducer:{movieData: movieDataReducer}
})

export default store;